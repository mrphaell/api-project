import request from 'supertest';
import express from 'express';
import { defaultRoute } from '../routes/default-route';

const app = express();
app.use('/', defaultRoute);

describe('Default Route', () => {
    it('should return "It works!"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('It works!');
    });
});