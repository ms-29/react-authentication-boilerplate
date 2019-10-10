import express from 'express';
import fs from 'fs';
import path from'path';
import cors from 'cors';
import { postgraphile } from 'postgraphile';
import { Pool } from 'pg';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import register from 'ignore-styles'

import PassportLoginPlugin from './plugins/PassportLoginPlugin';
import App from './src/app/app';

import 'dotenv/config';

register(['.sass', '.scss']);

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

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./dist/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App path={req.path} />)}</div>`
      )
    )
  })
}

app.use(
  express.static(
    path.join(
      __dirname,
      "dist"
    )
  )
);

app.get("/*", serverRenderer);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
