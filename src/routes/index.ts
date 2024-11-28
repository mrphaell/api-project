import express from 'express';
import { defaultRoute } from './default-route';
import { userRoutes } from './user-routes';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use('/user', userRoutes);