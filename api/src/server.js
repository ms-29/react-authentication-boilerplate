import express from 'express';
import cors from 'cors';
import { postgraphile } from 'postgraphile';
import { Pool } from 'pg';

import 'dotenv/config';

const app = express();

const pgPool = new Pool({
  user: process.env.POSTGRES_USER_NAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE
});

app.use(cors({
  origin: [
    process.env.POSTGRES_ALLOWED_ORIGIN
  ],
  optionsSuccessStatus: 200
}));

app.use(postgraphile(
  pgPool, process.env.POSTGRES_DATABASE_SCHEMA, {
    graphiql: true,
    watchPg: true,
    showErrorStack: true,
    extendedErrors: ['hint', 'detail', 'errcode'],
    jwtSecret: process.env.POSTGRES_JWT_SECRET,
    pgDefaultRole: process.env.POSTGRES_DEFAULT_ROLE,
    jwtPgTypeIdentifier: process.env.POSTGRES_TYPE_IDENTIFIER
  }
));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
