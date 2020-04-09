const User = require("../db/User");

module.exports = async (req, res, next) => {
    try {
        await User.create({
            ...req.body,
        })
        res.redirect('/login');
    } catch (e) {
        console.log("[routes:storeUser] e", e)
        res.redirect("/")
    }
};