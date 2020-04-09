const Application = require("../db/Application");
module.exports = async (req, res) => {
    let applications = await Application.find({}).sort({_id:-1});
    res.render("list_applications", { applications });
}