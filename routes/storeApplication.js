const Application = require("../db/Application");
const path = require("path")


module.exports = async (req, res, next) => {
    try {
        try {
            let { aadharCard, studentId, noc } = req.files;
            if (aadharCard) {
                req.body.aadharCard = movefile(aadharCard, 'files');
            }
            if (studentId) {
                req.body.studentId = movefile(studentId, 'files');
            }
            if (noc) {
                req.body.noc = movefile(noc, 'files');
            }
        } catch (error) {

        }
        finally {
            let preview = await Application.create({
                ...req.body,
                appliedBy: req.session.userId
            })
            let route = '/preview' + "/" + preview._id;
            res.redirect(route);
        }
    } catch (e) {
        console.log("[routes:storeUser] e", e)
        res.redirect("/")
    }
}
try {
    function movefile(file, folder) {
        file.mv(path.resolve(__dirname, '..', `public/images/${folder}`, file.name));
        file_path = `/images/${folder}/${file.name}`
        return file_path;
    }
} catch (error) {
    console.log("e", error)
}