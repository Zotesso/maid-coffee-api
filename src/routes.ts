import { Router } from 'express';

import UsersController from './controllers/UsersController';
import TasksController from './controllers/TasksController';

const routes = Router();

routes.get('/tasks/:type', TasksController.show)

routes.post('/user', UsersController.create);

export default routes;
