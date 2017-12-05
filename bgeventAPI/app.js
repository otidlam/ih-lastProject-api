const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

//  Here goes de const exported
const index = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// "Routes"
app.use('/', index);

// -- connect mongoose 
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/journal-development", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});



app.use((req, res, next) => {
  res.status(404);
  res.json({ error: "Not found" });
});
app.use((err, req, res, next) => {
  // always log the error
  console.log("ERROR", req.method, req.path, err);

  // Only send response if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.json({ error: "unexpected" });
  };
});

module.exports = app;
