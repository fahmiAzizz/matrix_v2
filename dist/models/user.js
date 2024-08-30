"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        tableName: 'Users',
        timestamps: true,
        paranoid: true,
    });
    return User;
};
