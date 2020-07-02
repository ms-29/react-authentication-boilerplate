const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const { parsed : config } = require('dotenv').config();
const postgraphile = require('@ms-29/authentication-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

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
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
