module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("burgers", {
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    Burger.associate = function (models) {
        Burger.belongsTo(models.patties, {
            foreignKey: {name: 'pattyId', allowNull: false},
            onDelete: "cascade"
        });
        Burger.belongsTo(models.buns, {
            foreignKey: {name: 'bunId', allowNull: false},
            onDelete: "cascade"
        });
        Burger.belongsTo(models.toppings, {
            foreignKey: {name: 'toppingId', allowNull: false},
            onDelete: "cascade"
        });
        Burger.hasOne(models.customers, {
            onDelete: "cascade"
        });
    };

    return Burger;
};