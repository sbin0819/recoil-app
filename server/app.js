import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import todosRouter from './routes/todo.routes';

var app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./models');

db.sequelize.sync();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

module.exports = app;
