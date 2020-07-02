const { Pool } = require('pg');
const { postgraphile } = require('postgraphile');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');

const PassportLoginPlugin = require('./plugins/PassportLoginPlugin');

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
      extendedErrors: ['hint', 'detail', 'errcode'],
      pgSettings: (request) => {
        return {
          'role': request.user ? 'role_auth_private' : 'role_auth_public',
          'jwt.claims.user_id': request.user ? request.user.userId : undefined
        }
      },
      appendPlugins: [
        PgSimplifyInflectorPlugin,
        PassportLoginPlugin
      ],
      additionalGraphQLContextFromRequest: (request) => {
        return {
          rootPgPool: pgPool,
          login: user => {
            return new Promise((resolve, reject) => {
              return request.login(user, err => (err ? reject(err) : resolve()));
            });
          }
        }
      }
    }
  );
};
