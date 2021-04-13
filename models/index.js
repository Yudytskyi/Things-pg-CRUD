const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const configs = require('./../configs/pg');

const mode = process.env.NODE_ENV ?? 'development';
const config = configs[mode];

const pgClient = new Client(config);

const currentFileName = path.basename(__filename);

const models = {};

fs.readdirSync(__dirname)
  .filter(f => /\.js$/i.test(f) && f != currentFileName)
  .forEach(f => {
    const model = require(path.resolve(__dirname, f));
    model._client = pgClient;
    models[model.name] = model;
  });

pgClient.connect();

process.on('beforeExit', () => pgClient.end());

module.exports = {
  client: pgClient,
  ...models,
};
