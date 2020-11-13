import { Router } from 'express';

import UsersController from './controllers/UsersController';
import TasksController from './controllers/TasksController';
import LoginController from './controllers/LoginController';

const routes = Router();

routes.post('/tasks', TasksController.create);
routes.get('/tasks/:type', TasksController.show)

routes.post('/user', UsersController.create);
routes.get('/user', UsersController.index);

routes.post('/login', LoginController.login);

export default routes;
