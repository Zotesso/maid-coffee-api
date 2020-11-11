import express from 'express';

import "reflect-metadata";
import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8090);
