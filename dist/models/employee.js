"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Employee.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        first_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        nik: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        gender: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            references: {
                model: 'Roles',
                key: 'role_name',
            },
            allowNull: false,
        },
        phone_number: {
            type: sequelize_1.DataTypes.STRING,
        },
        address: {
            type: sequelize_1.DataTypes.TEXT,
        },
        date_of_birth: {
            type: sequelize_1.DataTypes.DATE,
        }
    }, {
        sequelize,
        tableName: 'Employees',
        timestamps: true,
        paranoid: true,
    });
    return Employee;
};
