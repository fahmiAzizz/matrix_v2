import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ActivityAttributes {
    id: string;
    user_id: string;
    activity_type: 'login' | 'logout' | 'view' | 'edit' | 'create' | 'delete';
    timestamp: Date;
    created_at?: Date;
    updated_at?: Date;
}

interface ActivityCreationAttributes extends Optional<ActivityAttributes, 'id' | 'timestamp'> { }

class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
    public id!: string;
    public user_id!: string;
    public activity_type!: 'login' | 'logout' | 'view' | 'edit' | 'create' | 'delete';
    public timestamp!: Date;
    public created_at!: Date;
    public updated_at!: Date;
}

export default (sequelize: Sequelize) => {
    Activity.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        activity_type: {
            type: DataTypes.ENUM('login', 'logout', 'view', 'edit', 'create', 'delete'),
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'Activities',
        timestamps: true,
        paranoid: true,
    });

    return Activity;
};
