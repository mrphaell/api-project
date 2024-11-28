import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../models/user';
import { getAllUsers, getSingleUser, createSingleUser, updateSingleUser, deleteSingleUser } from '../services/user-service';

jest.mock('bcrypt');
jest.mock('../models/user');

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should return all users when no search term is provided', async () => {
            (User.findAll as jest.Mock).mockResolvedValue([{ id: '1', nome: 'John Doe', email: 'john@example.com' }]);

            const users = await getAllUsers('');

            expect(User.findAll).toHaveBeenCalled();
            expect(users).toEqual([{ id: '1', nome: 'John Doe', email: 'john@example.com' }]);
        });

        it('should return filtered users when a search term is provided', async () => {
            (User.findAll as jest.Mock).mockResolvedValue([{ id: '1', nome: 'John Doe', email: 'john@example.com' }]);

            const users = await getAllUsers('John');

            expect(User.findAll).toHaveBeenCalledWith({
                where: {
                    [Op.or]: [
                        { nome: { [Op.iLike]: '%John%' } },
                        { email: { [Op.iLike]: '%John%' } },
                    ],
                },
            });
            expect(users).toEqual([{ id: '1', nome: 'John Doe', email: 'john@example.com' }]);
        });
    });

    describe('getSingleUser', () => {
        it('should return a single user by id', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: '1', nome: 'John Doe', email: 'john@example.com' });

            const user = await getSingleUser('1');

            expect(User.findByPk).toHaveBeenCalledWith('1', { attributes: { exclude: ['senha'] } });
            expect(user).toEqual({ id: '1', nome: 'John Doe', email: 'john@example.com' });
        });
    });

    describe('createSingleUser', () => {
        it('should create a new user', async () => {
            (bcrypt.genSaltSync as jest.Mock).mockReturnValue('salt');
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            (User.create as jest.Mock).mockResolvedValue({ id: '1', nome: 'John Doe', email: 'john@example.com', senha: 'hashedPassword', funcao: 'admin' });

            const user = await createSingleUser('John Doe', 'john@example.com', 'password', 'admin');

            expect(bcrypt.genSaltSync).toHaveBeenCalledWith(7);
            expect(bcrypt.hash).toHaveBeenCalledWith('password', 'salt');
            expect(User.create).toHaveBeenCalledWith({ nome: 'John Doe', email: 'john@example.com', senha: 'hashedPassword', funcao: 'admin' });
            expect(user).toEqual({ id: '1', nome: 'John Doe', email: 'john@example.com', senha: 'hashedPassword', funcao: 'admin' });
        });
    });

    describe('updateSingleUser', () => {
        it('should update a user by id', async () => {
            (User.update as jest.Mock).mockResolvedValue([1]);
            (User.findOne as jest.Mock).mockResolvedValue({ id: '1', nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'cliente' });

            const user = await updateSingleUser('1', { nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'cliente' });

            expect(User.update).toHaveBeenCalledWith({ nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'cliente' }, { where: { id: '1' } });
            expect(User.findOne).toHaveBeenCalledWith({ where: { id: '1' }, attributes: { exclude: ['senha'] } });
            expect(user).toEqual({ id: '1', nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'cliente' });
        });
    });

    describe('deleteSingleUser', () => {
        it('should delete a user by id', async () => {
            (User.destroy as jest.Mock).mockResolvedValue(1);

            const result = await deleteSingleUser('1');

            expect(User.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(result).toBe(1);
        });
    });
});