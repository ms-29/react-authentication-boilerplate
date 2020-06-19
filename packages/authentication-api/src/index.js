const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { postgraphile } = require('postgraphile');
const { parsed : config } = require('dotenv').config();
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');

const app = express();

const pgPool = new Pool({
  user: config.POSTGRES_USER_NAME,
  password: config.POSTGRES_PASSWORD,
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DATABASE
});

app.use(cors());

app.use(postgraphile(
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
));

app.get("/*", function(request, response) {
  response.send('Hello from Authentication API');
});

const PORT = config.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
