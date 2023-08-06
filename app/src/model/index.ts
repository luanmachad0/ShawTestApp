import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';


interface UserAttributes {
    id: string;
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite_sport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        sequelize: db,
        tableName: 'users',
    }
);