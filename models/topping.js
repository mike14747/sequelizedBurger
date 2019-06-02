module.exports = function (sequelize, DataTypes) {
    const Topping = sequelize.define('toppings', {
        topping: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Topping.associate = function (models) {
        Topping.hasMany(models.burgers, {
            foreignKey: {name: 'toppingId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Topping;
};