"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

// var burger = require("../models/burger.js");

var selObj = {};

router.get("/", (req, res, next) => {
    db.burgers.findAll({
        attributes: ["id"],
        include: [
            {model: db.patties, attributes: ['patty']},
            {model: db.buns, attributes: db.bun},
            {model: db.toppings, attributes: db.topping},
            {model: db.customers, attributes: db.name}
        ]
    }).then(function(burgerData) {
        selObj.burgers = burgerData;
    });
    next();
});

router.get("/", (req, res, next) => {
    db.patties.findAll({}).then(function(pattyData) {
        selObj.patties = pattyData;
    });
    next();
});

router.get("/", (req, res, next) => {
    db.buns.findAll({}).then(function(bunData) {
        selObj.buns = bunData;
    });
    next();
});

router.get("/", (req, res) => {
    db.toppings.findAll({}).then(function (toppingData) {
        selObj.toppings = toppingData;
        res.render("index", selObj);
    });
});

// router.post("/api/burger", (req, res) => {
//     var table = "burgers";
//     burger.insertOne(table, ["patty_id", "bun_id", "topping_id"], [req.body.patty_id, req.body.bun_id, req.body.topping_id], (result) => {
//         res.json({ id: result.insertId });
//     });
// });

// router.put("/api/burger/:id", (req, res) => {
//     var table = "burgers";
//     var setVal = "devoured=1";
//     var condition = "id=" + req.params.id;
//     burger.updateOne(table, setVal, condition, (result) => {
//         if (result.changedRows == 0) {
//             return res.render("error").end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// router.delete("/api/delete/:id", (req, res) => {
//     var table = "burgers";
//     var condition = "id=" + req.params.id;
//     burger.deleteOne(table, condition, (result) => {
//         if (result.affectedRows == 0) {
//             return res.render("error").end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// router.put("/api/reset", (req, res) => {
//     var table = "burgers";
//     var setVal = "devoured=0";
//     burger.resetAll(table, setVal, (result) => {
//         if (result.changedRows == 0) {
//             return res.render("error").end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;