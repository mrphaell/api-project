import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';
import cors from 'cors';
import { Database } from './config/config';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

new Database();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
    console.log(`Server running: ${HOST}:${PORT}`);
});