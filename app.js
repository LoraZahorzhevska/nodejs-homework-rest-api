/* eslint-disable no-unused-vars */
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
