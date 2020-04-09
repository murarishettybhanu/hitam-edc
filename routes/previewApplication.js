const Application = require("../db/Application");
module.exports = async (req, res) => {
    let application = await Application.findById(req.params.id);
    res.render("preview", { application });
}