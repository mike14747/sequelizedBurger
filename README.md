# sequelizedBurger

## What the project does:

* This project allows users, to place custom veggie burger orders by entering their name and picking one thing from each of the following categories:
  * Patty type
  * Bun type
  * Topping group
* Once the order is placed, the order is stored in the database, then added to the 'Waiting to be eaten' area in the lower left portion of the screen.
* The user can then click the 'Devour Burger' button next to any burger and it will move to the 'Devoured Burgers' area in the lower right portion of the screen.
* Users can delete 'Devoured Burgers' by clicking on any of the 'Delete' buttons.
* There is a hidden link that can restore all of the 'Devoured Burgers' to their uneaten state.
  * Secret link location: click on the period at the end of the 'Add your own condiments / sauces at the condiment bar.' sentence. Shhh, don't tell anyone.

---

## How users can get started with the project:

To use this project, you'll need to do the following:

* Clone this repository onto your computer or upload it to heroku.

* If you're running it locally on your pc, also perform these steps:

    * run 'npm i' from the terminal (this will install the npm modules: express, mysql2, sequelize and express-handlebars)
    * create a mysql database using the schema in: **schema.sql** (this will create the database, but it won't have any tables... just yet)
    * run 'server.js' to dynamically the tables necessary
    * add default values of 'CURRENT_TIMESTAMP' for the 'createdAt' and 'updateAt' tables
    * populate the newly created database with the data in: **seeds.sql**
    * create a config/pwd.js file with the following contents (since this was excluded from being sent to guthub in the .gitignore file):

```
var pwd = "your_password";

module.exports = pwd;
```

This file will only be imported by 'config/index.js' if you're running this app locally because I modified 'config/index.js' in the following way:

```
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    const pwd = require("../config/pwd.js"); // this line was added
    sequelize = new Sequelize(config.database, config.username, pwd, config); // config.password was replaced by pwd
}
```

The above 'config/pwd.js' file was utilized to keep my local MySQL password from being uploaded in my github repository.

---

## About the code in this project:

*  This project is a burger logger with MySQL, Node, Express, Express-Handlebars and uses Sequelize as the ORM.
* It following the MVC design pattern (with the code/files broken up in models, views and controllers folders).
  * config/config.json: handles the MySQL connection, then exports that connection to models/index.js.
  * The models folder contains all the necessary Sequelize object models (there are 5 in this project). All object models are exported to: controllers/burgers_controller.js.
  * controllers/burgers_controller.js imports the whole 'modles' folder and handles all the routing... matching specific CRUD requests to their proper Sequelize functions using express.Router()... which is exported to server.js. It also renders express-handlebars pages to the browser when applicable.
  * server.js sets up the server, ties everything together and uses express-handlebars to render the html to the browser.
  * public/js/process.js validates all user input, then performs the appropriate AJAX calls based upon user input. These AJAX calls are looped back into controllers/burgers_controller.js for processing.

User input validation is handled by 'public/js/process.js' as follows:
* Each group is checked to make sure one radio button from each is checked by using the ':checked' pseudo class:
```
if ($("[name='patty']:checked").length === 0) {
    errors = true;
    errorArray.push("You must select a patty!");
    $("#patty_error").removeClass("invisible");
} else {
    $("#patty_error").addClass("invisible");
}
```
* If any of the 3 groups doesn't have a radio button checked:
  * the error modal appears informing the user of the group or groups that weren't selected
  * the group missing a selection has an error message displayed under it
* If the name field is validated using a regex match of (to make sure it's from 1 to 20 characters long... containing only letters, numbers, underscores and dashes):

```
if (!$("#customer_name").val().trim().match(/^[a-zA-Z0-9 _-]{1,20}$/)) {
```

Interesting notes about the code in this project:
* The database contains 5 tables.
  * burgers (which is just a collection of foreign keys of the next 3 tables)
  * patties (whose contents are used to dynamically create the list of patties when placing an order)
  * buns (whose contents are used to dynamically create the list of buns when placing an order)
  * toppings (whose contents are used to dynamically create the list of toppings when placing an order)
  * customers (which is linked to a specific burger via a foreign key)
* On the main homepage route, 4 sequelize queries are performed (one to list all the burgers on the page in both the 'Uneaten' and 'Devoured' areas... with the snippet shown below):

```
var selObj = {};

router.get("/", (req, res, next) => {
    db.burgers.findAll({
        attributes: ["id", "devoured"],
        order: [["id", "ASC"]],
        include: [
            { model: db.patties, attributes: ['patty'] },
            { model: db.buns, attributes: ['bun'] },
            { model: db.toppings, attributes: ['topping'] },
            { model: db.customers, attributes: ['name'] }
        ]
    }).then(function (burgerData) {
        selObj.burgers = burgerData;
    });
    next();
});

router.get("/", (req, res, next) => {
    db.patties.findAll({
        order: [["id", "ASC"]]
    }).then(function (pattyData) {
        selObj.patties = pattyData;
    });
    next();
});

router.get("/", (req, res, next) => {
    db.buns.findAll({
        order: [["id", "ASC"]]
    }).then(function (bunData) {
        selObj.buns = bunData;
    });
    next();
});

router.get("/", (req, res) => {
    db.toppings.findAll({
        order: [["id", "ASC"]]
    }).then(function (toppingData) {
        selObj.toppings = toppingData;
        res.render("index", selObj);
    });
});
```

Handlebars (in the index.handlebars file) is then used to determine which group each burger is placed in.
```
{{#each burgers}}
{{#unless devoured}}
```
and
```
{{#each burgers}}
{{#if devoured}}
```
  * The next 3 queries are used to populate the patties, buns and toppings sections of the burger ordering area.
  * Each of those queries is then rendered into the browser via index.handlebars using handlebars 'partials' for each of patties, buns and toppings like this snippet from 'index.handlbars':
```
{{#each patties}}
{{> patties}}
{{/each}}
```
and
```
{{#each buns}}
{{> buns}}
{{/each}}
```
and
```
{{#each toppings}}
{{> toppings}}
{{/each}}
```

The POST route for adding a new burger order was a little tricky because it had to create a new burger, but also return the id of the newly created burger to be inserted in the customers table and associated with that specific burger. I did it this way (with the id being passed as part of then's result argument):
```
router.post("/api/burger", (req, res) => {
    db.burgers.create({
        pattyId: req.body.pattyId,
        bunId: req.body.bunId,
        toppingId: req.body.toppingId,
    }).then(function (result) {
        db.customers.create({
            burgerId: result.id,
            name: req.body.name
        }).then(function (dbBurger) {
            res.json(dbBurger);
        });
    });
});
```
---

## More Info about this project:

* To find out more about the npm modules used in this project:
  * https://www.npmjs.com/package/mysql2
  * https://www.npmjs.com/package/express
  * https://www.npmjs.com/package/express-handlebars
  * https://www.npmjs.com/package/sequelize

---

## This project was created and is maintained by:

* Mike Gullo
* https://lit-harbor-30183.herokuapp.com/
* https://github.com/mike14747
* Contact me at: mike4747@oh.rr.com for more info about this project.