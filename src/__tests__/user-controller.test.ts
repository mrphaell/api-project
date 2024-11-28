import { Request, Response } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user-controller';
import { getAllUsers, getSingleUser, createSingleUser, updateSingleUser, deleteSingleUser } from '../services/user-service';

jest.mock('../services/user-service');

describe('User Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    describe('getUsers', () => {
        it('should return a list of users with status 200', async () => {
            req.query = { filter: '' };
            (getAllUsers as jest.Mock).mockResolvedValue([{ id: 1, nome: 'John Doe', email: 'john@example.com' }]);

            await getUsers(req as Request, res as Response);

            expect(getAllUsers).toHaveBeenCalledWith('');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'John Doe', email: 'john@example.com' }]);
        });

        it('should return an error with status 400', async () => {
            req.query = { filter: '' };
            (getAllUsers as jest.Mock).mockRejectedValue(new Error('Erro ao listar usuários'));

            await getUsers(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao listar usuários' });
        });
    });

    describe('getUser', () => {
        it('should return a user with status 200', async () => {
            req.params = { id: '1' };
            (getSingleUser as jest.Mock).mockResolvedValue({ id: 1, nome: 'John Doe', email: 'john@example.com' });

            await getUser(req as Request, res as Response);

            expect(getSingleUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'John Doe', email: 'john@example.com' });
        });

        it('should return an error with status 400', async () => {
            req.params = { id: '1' };
            (getSingleUser as jest.Mock).mockRejectedValue(new Error('Erro ao listar usuário'));

            await getUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao listar usuário' });
        });
    });

    describe('createUser', () => {
        it('should create a user and return 201 status', async () => {
            req.body = { nome: 'John Doe', email: 'john@example.com', senha: 'password', funcao: 'admin' };
            (createSingleUser as jest.Mock).mockResolvedValue({ id: 1, nome: 'John Doe', email: 'john@example.com', senha: 'hashedPassword', funcao: 'admin' });

            await createUser(req as Request, res as Response);

            expect(createSingleUser).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password', 'admin');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'John Doe', email: 'john@example.com', senha: 'hashedPassword', funcao: 'admin' });
        });

        it('should return 400 status on error', async () => {
            req.body = { nome: 'John Doe', email: 'john@example.com', senha: 'password', funcao: 'admin' };
            (createSingleUser as jest.Mock).mockRejectedValue(new Error('Erro ao criar usuário'));

            await createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar usuário' });
        });
    });

    describe('updateUser', () => {
        it('should update a user and return 200 status', async () => {
            req.params = { id: '1' };
            req.body = { nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'user' };
            (updateSingleUser as jest.Mock).mockResolvedValue({ id: 1, nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'user' });

            await updateUser(req as Request, res as Response);

            expect(updateSingleUser).toHaveBeenCalledWith('1', { nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'user' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'user' });
        });

        it('should return 400 status on error', async () => {
            req.params = { id: '1' };
            req.body = { nome: 'John Doe Updated', email: 'john.updated@example.com', funcao: 'user' };
            (updateSingleUser as jest.Mock).mockRejectedValue(new Error('Erro ao atualizar usuário'));

            await updateUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar usuário' });
        });
    });

    describe('deleteUser', () => {
        it('should delete a user and return 200 status', async () => {
            req.params = { id: '1' };
            (deleteSingleUser as jest.Mock).mockResolvedValue({});

            await deleteUser(req as Request, res as Response);

            expect(deleteSingleUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuário deletado com sucesso!' });
        });

        it('should return 400 status on error', async () => {
            req.params = { id: '1' };
            (deleteSingleUser as jest.Mock).mockRejectedValue(new Error('Erro ao excluir usuário'));

            await deleteUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir usuário' });
        });
    });
});