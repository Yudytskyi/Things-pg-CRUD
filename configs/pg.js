module.exports = {
  development: {
    database: 'things_db',
    user: 'postgres',
    password: 'postgres',
  },
  test: { database: 'things_db_test', user: 'postgres' },
  production: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
};
