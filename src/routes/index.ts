// src/routes/index.ts
import { Router } from 'express';
import usersRouter from './users.routes';
import sesionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sesionsRouter);

export default routes;