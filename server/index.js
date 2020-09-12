const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');

// Config files for server setup
const db = require('./models');
const routes = require('./routes');
const passport = require('./config/passport');

// Setting up Express instance with port 
const app = express();
const port = process.env.PORT || 4000;

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Express/Passport session
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  cookie: { maxAge: 36000},
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Use Express routes
app.use(routes);

// Serve static React files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
};

// Default route to catch routing errors
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), 
  function (err) {
    res.status(500).send(err)
  })
})

// Establish connection to MySQL
// Begin listening on port
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server now listening on Port ${port}...`);
  });
})