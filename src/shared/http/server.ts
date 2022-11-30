import 'reflect-metadata';
import 'express-async-errors';
import '@shared/typeorm';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.use(errors());

server.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

server.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('🟢 Server started on port 3333!');
});
