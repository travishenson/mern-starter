const router = require('express').Router();
const db = require('../../models').sequelize;

router.route('/')
  .get((req, res) => {
    db.User.findAll({}).then(users => res.json(users));
  })

module.exports = router;