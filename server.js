import express from 'express';
import path from'path';
import cors from 'cors';
import { postgraphile } from 'postgraphile';
import { Pool } from 'pg';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

import PassportLoginPlugin from './plugins/PassportLoginPlugin';

import 'dotenv/config';

const app = express();

const pgPool = new Pool({
  user: process.env.POSTGRES_USER_NAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
  secret: process.env.POSTGRES_JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post("/logout", function(request, response) {
  request.logout();
  response.send({ success: true });
});

app.use(postgraphile(
  pgPool, process.env.POSTGRES_DATABASE_SCHEMA, {
    graphiql: true,
    watchPg: true,
    showErrorStack: true,
    extendedErrors: ['hint', 'detail', 'errcode'],
    pgSettings: (request) => {
      return {
        'role': request.user ? 'role_auth_private' : 'role_auth_public',
        'jwt.claims.user_id': request.user ? request.user.user_id : undefined
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
));

app.use(
  express.static(
    path.join(
      __dirname,
      "build"
    )
  )
);

app.get("/*", function(request, response) {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
