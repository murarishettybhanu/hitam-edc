var express = require('express');
var router = express.Router();
var aidGenerator = require("../helper/aidGenerator");

router.get('/', async function(req, res, next) {
    if(!req.session.userId) {
    res.redirect('/loginPage');
}
    else {
    let AppID = await aidGenerator();
    res.render('apply', { AppID });
}
    // res.render('index');
});

module.exports = router;
