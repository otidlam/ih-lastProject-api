const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//  Here goes de const exported
const index = require('./routes/index');
const auth = require("./routes/auth");

const app = express();


// -- connect mongoose 
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// "Routes"
app.use('/', index);
app.use("/auth", auth);


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
