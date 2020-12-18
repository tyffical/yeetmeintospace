const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

require('dotenv').config(); 
const isProduction = process.env.NODE_ENV === 'production'; 
const history = require('connect-history-api-fallback');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'yeetmeintospace-bUL0BPMha51zBQKX36hp',
  resave: true,
  saveUninitialized: true
}));

// server html+css+js frontend
app.use(history());
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));

// redirects back to homepage if invalid get request by user
function redirectUnmatched(req, res) {
  res.status(400).json({ message: 'Invalid request, return to homepage' });
};

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use(redirectUnmatched);

module.exports = app;

