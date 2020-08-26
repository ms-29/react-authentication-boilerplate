import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import postgraphile from '@ms-29/authentication-api';
import register from 'ignore-styles';

import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import App from './src/index.ssr';

const app = express();
const { parsed : config } = dotenv.config();
const PORT = config.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(session({
  resave: true,
  rolling: true,
  saveUninitialized: true,
  secret: config.SESSION_SECRET,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 20 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(postgraphile(config));

app.get("/*", function(request, response) {
  renderToStringWithData(
    <App path={request.path} />
  ).then(content => {
    const helmet = Helmet.renderStatic();

    const html = 
     `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          ${helmet.title.toString()}
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta property="og:site_name" content="React App" />
          <link rel="stylesheet" href="/static/main.css" />
        </head>
        <body>
          <div id="root" class="d-flex flex-column min-vh-100">${content}</div>
          <script src="/static/main.js"></script>
        </body>
      </html>`;

    response.send(html);
    
  }).catch(err => {
    response.send({'Error': err});
  });
});

app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
