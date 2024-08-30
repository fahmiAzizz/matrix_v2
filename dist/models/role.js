"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Role.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        role_name: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'Roles',
        timestamps: true,
        paranoid: true,
    });
    return Role;
};
