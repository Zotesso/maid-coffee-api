import express from 'express';

import cors from 'cors';

import "reflect-metadata";
import './database/connection';
import routes from './routes';

const app = express();
/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE'); */
    app.use(cors());
/*     next();
}); */

app.use(express.json());
app.use(routes);

app.listen(8090);
