import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface RoleAttributes {
  id: string;
  role_name: string;
  created_at?: Date;
  updated_at?: Date;
}


interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: string;
  public role_name!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

export default (sequelize: Sequelize) => {
  Role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
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
