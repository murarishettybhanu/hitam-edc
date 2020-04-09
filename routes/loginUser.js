const bcrypt = require('bcryptjs')
const User = require('../db/User')

module.exports = (req, res, next) => {
    const { email, password } = req.body;
    try {
        User.findOne({ email }, (error, user) => {
            if (user) {
                // compare passwords.
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        req.session.userId = user._id;
                        req.session.email = user.email;
                        req.flash('loginSuccess', 'You Are Logged In')
                        res.redirect('/');
                    } else {
                        req.flash('IncorrectPwd', 'You Have Entered an Incorrect Password')
                        res.redirect('/')
                    }
                })
            } else {

                return req.flash('IncorrectEmail', 'You Have Entered an Incorrect Email'), res.redirect('/')
            }
        })
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}
