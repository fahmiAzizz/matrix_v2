"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const employee_1 = __importDefault(require("../models/employee"));
const activity_1 = __importDefault(require("../models/activity"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    database: process.env.DBNAME || 'rest-api',
    username: process.env.DBUSER || 'root',
    password: process.env.PASSWORD || '',
    host: process.env.HOST || 'localhost',
    dialect: 'mysql'
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.User = (0, user_1.default)(sequelize);
db.Role = (0, role_1.default)(sequelize);
db.Employee = (0, employee_1.default)(sequelize);
db.Activity = (0, activity_1.default)(sequelize);
db.Activity.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasOne(db.Employee, { foreignKey: 'user_id', sourceKey: 'id', as: 'employee' });
db.Employee.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
db.Role.hasMany(db.Employee, { foreignKey: 'role', sourceKey: 'role_name' });
db.Employee.belongsTo(db.Role, { foreignKey: 'role', targetKey: 'role_name' });
exports.default = db;
