SET FOREIGN_KEY_CHECKS=0;
INSERT INTO burgers (pattyId, bunId, toppingId) VALUES
    (1, 1, 1),
    (2, 2, 3),
    (3, 3, 5);

INSERT INTO patties (patty) VALUES
    ('Portobello'),
    ('Spicy Black Bean'),
    ('Aduki Bean BBQ'),
    ('Lentil/Quinoa');

INSERT INTO buns (bun) VALUES
    ('Multigrain'),
    ('Ciabatta'),
    ('Kaiser');

INSERT INTO toppings (topping) VALUES
    ('Lettuce, Tomato and Onion'),
    ('Lettuce, Tomato and Avocado'),
    ('Tomato and Avocado'),
    ('Mushroom and Onion'),
    ('No Toppings');

INSERT INTO customers (name, burgerId) VALUES
    ('mike', 3),
    ('Billy Bob', 2),
    ('Anonymous', 1);
SET FOREIGN_KEY_CHECKS=1;