module.exports = function (sequelize, DataTypes) {
    const Bun = sequelize.define('buns', {
        bun: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Bun.associate = function (models) {
        Bun.hasMany(models.burgers, {
            foreignKey: {name: 'bunId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Bun;
};