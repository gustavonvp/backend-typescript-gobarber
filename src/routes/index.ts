import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import SessionsRouter from './sessions.routes';
import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
