"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Activity extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Activity.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        activity_type: {
            type: sequelize_1.DataTypes.ENUM('login', 'logout', 'view', 'edit', 'create', 'delete'),
            allowNull: false,
        },
        timestamp: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'Activities',
        timestamps: true,
        paranoid: true,
    });
    return Activity;
};
