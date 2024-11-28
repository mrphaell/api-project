import { sequelize } from '../config/database';

describe('Sequelize Configuration', () => {
    it('should have the correct database name', () => {
        expect(sequelize.config.database).toBe(process.env.DB_NAME);
    });

    it('should use the postgres dialect', () => {
        expect(sequelize.getDialect()).toBe('postgres');
    });

    it('should have the correct username', () => {
        expect(sequelize.config.username).toBe(process.env.DB_USERNAME);
    });

    it('should have the correct password', () => {
        expect(sequelize.config.password).toBe(process.env.DB_PASSWORD);
    });

    it('should have the correct host', () => {
        expect(sequelize.config.host).toBe(process.env.DB_HOST);
    });

    it('should have the correct port', () => {
        expect(sequelize.config.port).toBe(Number(process.env.DB_PORT));
    });
});