import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserAttributes {
    id: string;
    username: string;
    password: string;
    token: string;
    created_at?: Date;
    updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public username!: string;
    public password!: string;
    public token!: string;
    public created_at!: Date;
    public updated_at!: Date;
}


export default (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
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
