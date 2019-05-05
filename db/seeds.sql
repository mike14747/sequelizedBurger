SET FOREIGN_KEY_CHECKS=0;
INSERT INTO burgers (pattyId, bunId, toppingId, customerId) VALUES
    (1, 1, 1, 2),
    (2, 2, 3, 1),
    (3, 3, 5, 3);

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

INSERT INTO customers (name) VALUES
    ('mike'),
    ('Billy Bob'),
    ('Anonymous');
SET FOREIGN_KEY_CHECKS=1;

-- SELECT bg.id, p.patty, bn.bun, t.topping FROM burgers AS bg INNER JOIN buns AS bn ON bg.bun_id=bn.bun_id INNER JOIN patties AS p ON bg.patty_id=p.patty_id INNER JOIN toppings AS t ON bg.topping_id=t.topping_id