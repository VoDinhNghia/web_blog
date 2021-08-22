const { render } = require("ejs");
const method = require('./MethodController');
const dateFormat = require('dateformat');
const controller = require('./Controller');

let Notify = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let notify = await method.MethodGet('/api/list/notify-slc', req.session.token)
            let info_user = await method.MethodGet('/api/list-user', req.session.token)
            res.render('notify_user', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                detail_notify: notify.data,
                info_user: info_user.data,
                num_mess: data[1],
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/');
    }
}

let DetailNotify = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let notify = await method.MethodGet('/api/read/notify/' + req.params.id, req.session.token)
            res.redirect(`/info/post/${req.params.id_post}`)
        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    Notify: Notify,
    DetailNotify: DetailNotify
}