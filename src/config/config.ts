import { Sequelize } from 'sequelize';
import User from '../models/user';

export class Database {
    public connection: Sequelize;

    constructor() {
        const dbName = process.env.DB_NAME;
        const dbUsername = process.env.DB_USERNAME;
        const dbPassword = process.env.DB_PASSWORD;
        if (!dbName || !dbUsername) throw new Error('Database credentials not provided');

        const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
            dialect: 'postgres',
            logging: false
        });

        this.connection = sequelize;
        this.connection.authenticate().then(() => {
            console.log('Connection established');
            this.syncModels();
        }).catch((error) => {
            console.error('Unable to connect to database: ', error);
        })
    }

    private async syncModels() {
        await User.sync();
    }
}