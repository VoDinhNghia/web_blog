const { render } = require("ejs");
const method = require('./MethodController');
const dateFormat = require('dateformat');
const controller = require('./Controller');

let ChangeBackground = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "ModeBG": req.body.mode
            }
            let SendMess = await method.MethodPut('/api/change/background', body, req.session.token);
            res.redirect(`/personel/page`);
        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    ChangeBackground: ChangeBackground
}