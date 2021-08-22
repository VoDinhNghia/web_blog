const { render } = require("ejs");
const method = require('./MethodController');
const dateFormat = require('dateformat');
const controller = require('./Controller');

let Contact = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            res.render('form_contact', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            })

        }
    } catch (error) {
        res.redirect('/');
    }
}

let SubmitContact = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let body = {
                "Content": req.body.content
            }
            let sendContact = await method.MethodPost('/api/contact', body, req.session.token)
            res.render('contact_reply', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            })


        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    Contact: Contact,
    SubmitContact: SubmitContact
}