const express = require('express');
const ThingRouter = require('./routes/thing.route');

const app = express();

app.use(express.json());

app.use('/api', ThingRouter);

app.use((err, req, res, next) => {
  res.status(err?.status ?? 500).send(err?.message ?? err);
});

module.exports = app;
