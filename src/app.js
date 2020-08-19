import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
// import { config } from 'dotenv';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import routes from './v1/routes/index';

require('dotenv').config();

const app = express();

// setup database connection
mongoose.connect(process.env.TEST_DB_URI_ATLAS, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});

// setup morgan
app.use(morgan('dev'));

// setup body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to interview Tutorial API, go through documentation to find endpoints for your request'));

// Set up routes for v1
app.use('/api/v1/', routes);

// set up route for swagger documentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// route to catch all requests on endpoints not defined
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found.',
    possibleCauses: [
      'Maybe you got the URL wrong',
      '...',
    ],
  });
});

// catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = 'Sorry, this path doesn\'t exit';
  next(err);
});

// error handler

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({
    err,
  });
});

app.listen(process.env.PORT, () => {
  debug('dev')(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
