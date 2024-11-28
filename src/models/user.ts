import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
    id?: string;
    nome: string;
    email: string;
    senha?: string;
    funcao: 'admin' | 'cliente';
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public funcao!: 'admin' | 'cliente';
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    funcao: {
        type: DataTypes.ENUM('admin', 'cliente'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
    hooks: {
        afterCreate: (user) => {
            delete user.dataValues.senha;
        },
        afterUpdate: (user) => {
            delete user.dataValues.senha;
        }
    }
});

export default User;
