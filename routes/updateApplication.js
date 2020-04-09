const Application = require("../db/Application");

module.exports = async (req, res, next) => {
    try {
        if (req.params.code == "comment") {
            await Application.findByIdAndUpdate(req.params.id, {
                comment: req.query.comment
            })
        }
        else {
            await Application.findByIdAndUpdate(req.params.id, {
                status: req.params.status
            })
        }
        res.redirect('/listApplications');
    } catch (e) {
        console.log("[routes:storeUser] e", e)
        res.redirect("/")
    }
};