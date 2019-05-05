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
            foreignKey: {name: 'pattyId', allowNull: false}
        });
        Burger.belongsTo(models.buns, {
            foreignKey: {name: 'bunId', allowNull: false}
        });
        Burger.belongsTo(models.toppings, {
            foreignKey: {name: 'toppingId', allowNull: false}
        });
        Burger.belongsTo(models.customers, {
            foreignKey: {name: 'customerId', allowNull: false}
        });
    };

    return Burger;
};