const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models').sequelize;

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.User.findOne({ where: { username: username }})
    .then((dbUser) => {
      // No user was found with given username
      if (!dbUser) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Password for given username was incorrect
      if (!dbUser.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;