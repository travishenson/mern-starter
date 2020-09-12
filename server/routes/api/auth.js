const router = require('express').Router();
const db = require('../../models').sequelize;
const passport = require('../../config/passport');

router.route('/signup')
  .post((req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
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