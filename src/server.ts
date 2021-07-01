import express, { NextFunction, Request, Response } from 'express';

import 'reflect-metadata';

import 'express-async-errors';
import { router } from 'shared/infra/http/routes';
import { createConnection } from 'typeorm';

createConnection();

const app = express();

app.use(express.json());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        return response.status(500).json({
            status: "error",

            message: `Internal server error - ${err.message}`,
        });
    }
);

app.use(router);

app.listen(3333, () => console.log("Server is runnig"));


export { app };