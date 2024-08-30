import { Sequelize } from 'sequelize';
import UserModel from '../models/user';
import RoleModel from '../models/role';
import EmployeeModel from '../models/employee';
import ActivityModel from '../models/activity';



import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DBNAME || 'rest-api',
    username: process.env.DBUSER || 'root',
    password: process.env.PASSWORD || '',
    host: process.env.HOST || 'localhost',
    dialect: 'mysql'
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize);
db.Role = RoleModel(sequelize);
db.Employee = EmployeeModel(sequelize);
db.Activity = ActivityModel(sequelize)


db.Activity.belongsTo(db.User, { foreignKey: 'user_id' });

db.User.hasOne(db.Employee, { foreignKey: 'user_id', sourceKey: 'id', as: 'employee' });
db.Employee.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });

db.Role.hasMany(db.Employee, { foreignKey: 'role', sourceKey: 'role_name' });
db.Employee.belongsTo(db.Role, { foreignKey: 'role', targetKey: 'role_name' });

export default db;
