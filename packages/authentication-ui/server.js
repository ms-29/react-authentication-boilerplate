const express = require('express');
const path = require('path');
const { parsed : config } = require('dotenv').config();
const postgraphile = require('@ms-29/authentication-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.use(postgraphile(config));

app.get("/*", function(request, response) {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
