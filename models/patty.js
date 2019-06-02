module.exports = function (sequelize, DataTypes) {
    const Patty = sequelize.define('patties', {
        patty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Patty.associate = function (models) {
        Patty.hasMany(models.burgers, {
            foreignKey: {name: 'pattyId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Patty;
};