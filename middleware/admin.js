const User = require('../db/User')

module.exports = (req, res, next) => {
  // fetch user from database
  User.findById(req.session.userId, (error, user) => {
    if (user.email === "admin@hitamedc.com") {
      next()
    }
    else{
      res.redirect('/')
    }
  })

}