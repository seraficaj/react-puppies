const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('./config/database');
require('dotenv').config();

const puppiesRouter = require('./routes/api/puppies');
const usersRouter = require('./routes/api/users');

const app = express();
app.use(cors());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// api routes must be before the "catch all" route
app.use('/api/puppies', puppiesRouter);
app.use('/api/users', usersRouter);

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});