module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('customers', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1 - 20],
                    msg: "Customer name must be between 1 and 20 characters in length!"
                }
            }
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });

    Customer.associate = function (models) {
        Customer.belongsTo(models.burgers, {
            foreignKey: {name: 'burgerId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Customer;
};