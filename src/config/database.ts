import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    define: {
        timestamps: true
    },
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});