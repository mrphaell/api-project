import request from 'supertest';
import express from 'express';
import { userRoutes } from '../routes/user-routes';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user-controller';

jest.mock('../controllers/user-controller');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all users', async () => {
        (getUsers as jest.Mock).mockImplementation((req, res) => res.status(200).json([{ id: '1', name: 'John Doe' }]));

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: '1', name: 'John Doe' }]);
        expect(getUsers).toHaveBeenCalled();
    });

    it('should get a user by id', async () => {
        (getUser as jest.Mock).mockImplementation((req, res) => res.status(200).json({ id: '1', name: 'John Doe' }));

        const response = await request(app).get('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '1', name: 'John Doe' });
        expect(getUser).toHaveBeenCalled();
    });

    it('should create a user', async () => {
        (createUser as jest.Mock).mockImplementation((req, res) => res.status(201).json({ id: '1', name: 'John Doe' }));

        const response = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john@example.com' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: '1', name: 'John Doe' });
        expect(createUser).toHaveBeenCalled();
    });

    it('should update a user', async () => {
        (updateUser as jest.Mock).mockImplementation((req, res) => res.status(200).json({ id: '1', name: 'John Doe Updated' }));

        const response = await request(app)
            .put('/users/1')
            .send({ name: 'John Doe Updated', email: 'john.updated@example.com' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '1', name: 'John Doe Updated' });
        expect(updateUser).toHaveBeenCalled();
    });

    it('should delete a user', async () => {
        (deleteUser as jest.Mock).mockImplementation((req, res) => res.status(200).json({ message: 'User deleted successfully' }));

        const response = await request(app).delete('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'User deleted successfully' });
        expect(deleteUser).toHaveBeenCalled();
    });
});