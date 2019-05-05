"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

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

router.put("/api/burger/:id", (req, res) => {
    db.burgers.update({
        devoured: 1
    }, {
            where: { id: req.params.id }
        }).then(function (dbBurger) {
            res.json(dbBurger);
        });
});

router.delete("/api/delete/:id", (req, res) => {
    db.burgers.destroy({
        where: { id: req.params.id }
    }).then(function (dbBurger) {
        res.json(dbBurger);
    });
});

router.put("/api/reset", (req, res) => {
    db.burgers.update({
        devoured: 0
    }, {
            where: { devoured: 1 }
        }).then(function (dbBurger) {
            res.json(dbBurger);
        });
});

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;