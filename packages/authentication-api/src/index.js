const { Pool } = require('pg');
const { postgraphile } = require('postgraphile');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');

module.exports = function (config) {
  const pgPool = new Pool({
    user: config.POSTGRES_USER_NAME,
    password: config.POSTGRES_PASSWORD,
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    database: config.POSTGRES_DATABASE
  });
  
  return postgraphile(
    pgPool, config.POSTGRES_DATABASE_SCHEMA, {
      graphiql: true,
      watchPg: true,
      showErrorStack: true,
      jwtSecret: config.POSTGRES_JWT_SECRET,
      jwtPgTypeIdentifier: config.POSTGRES_TYPE_IDENTIFIER,
      extendedErrors: ['hint', 'detail', 'errcode'],
      appendPlugins: [
        PgSimplifyInflectorPlugin
      ]
    }
  );
};
