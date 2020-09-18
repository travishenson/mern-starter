const router = require('express').Router();
const db = require('../../models').sequelize;
const passport = require('../../config/passport');

router.route('/register')
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Return error if no username
    if (!username) {
      return res.status(422).send({ error: 'You must enter a username.' });
    }
    
    // Return error if no password
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' })
    }

    // Return error if username is taken
    db.User.findOne({ where: { username: username }}, (err, existingUser) => {
      if (err) return next(err);

      if (existingUser) {
        return res.status(422).send({ error: 'That username is taken' });
      }
    })

    // Create user if request passes all error checks
    db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(() => res.send({ username: req.body.username }))
    .catch(err => res.json(err));
  })

router.post('/login', 
  (req, res, next) => { 
    next();
  },
  passport.authenticate('local'), 
  (req, res) => {
    let userInfo = { username: req.user.username };
    res.send(userInfo);
  }
)

module.exports = router;