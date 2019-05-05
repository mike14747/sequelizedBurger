module.exports = function (sequelize, DataTypes) {
    const Patty = sequelize.define('patties', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    });
    // Patty.associate = function (models) {
    //     Patty.hasMany(models.Burger, {
    //         onDelete: "cascade"
    //     });
    // };
    return Patty;
};

module.exports = function (sequelize, DataTypes) {
    const Bun = sequelize.define('bun', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Bun.associate = function (models) {
    //     Bun.hasMany(models.Burger, {
    //         onDelete: "cascade"
    //     });
    // };
    return Bun;
};

module.exports = function (sequelize, DataTypes) {
    const Topping = sequelize.define('topping', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Topping.associate = function (models) {
    //     Topping.hasMany(models.Burger, {
    //         onDelete: "cascade"
    //     });
    // };
    return Topping;
};