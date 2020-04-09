const Application = require('../db/Application');
module.exports = async () => {
    try {
        let AppID = await AppIDGenerate();
        if (AppID) return AppID;
        next();
    } catch (e) {
        console.log('[tidGenerator] ' + e);
        res.redirect('/dashboard');
    };
};
async function AppIDGenerate() {
    try {
        var AppID = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
        let AppIDFound = await Application.findOne({ AppID: AppID });
        if (AppIDFound) AppIDGenerate();
        return AppID;
    } catch (e) {
        console.log('aidGenerator:AppIDGenerate ' + e);
    };
};


