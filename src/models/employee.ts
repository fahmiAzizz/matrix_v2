import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface EmployeeAttributes {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    nik: string;
    gender: string,
    role: string;
    phone_number?: string;
    address?: string;
    date_of_birth?: Date;
    created_at?: Date;
    updated_at?: Date;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> { }


class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
    public id!: string;
    public user_id!: string;
    public first_name!: string;
    public last_name!: string;
    public nik!: string;
    public gender!: string;
    public role!: string;
    public phone_number?: string;
    public address?: string;
    public date_of_birth?: Date;
    public created_at!: Date;
    public updated_at!: Date;
}


export default (sequelize: Sequelize) => {
    Employee.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nik: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            references: {
                model: 'Roles',
                key: 'role_name',
            },
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.TEXT,
        },
        date_of_birth: {
            type: DataTypes.DATE,
        }
    }, {
        sequelize,
        tableName: 'Employees',
        timestamps: true,
        paranoid: true,
    });

    return Employee;
};
