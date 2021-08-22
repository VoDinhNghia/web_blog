const { render } = require("ejs");
const method = require('./MethodController');
const dateFormat = require('dateformat');
const controller = require('./Controller');

let Message = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let notify = await method.MethodGet('/api/list/notify-slc', req.session.token);
            //let mess = await method.MethodGet('/api/message/unread', req.session.token);
            let mess = await method.MethodGet('/api/list/user/sendmess', req.session.token);
            let mess_user = [];
            if ((mess.data).length > 0) {
                let idUser = mess.data
                mess_user = await method.MethodGet('/api/list/message/get-send/' + idUser[idUser.length - 1].ID, req.session.token);
            }
            //let mess_send = await method.MethodGet('/api/list/mysend/unread', req.session.token);
            //let all_user_mess = await method.MethodGet('/api/message/read', req.session.token);
            res.render('message', {
                avatar_home: data[0],
                notify: data[2],
                detail_notify: notify.data,
                num_mess: data[1],
                mess: mess.data,
                ModeBG: data[5],
                mess_user: mess_user.data || []
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

let SendMessage = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "IdUserGet": req.body.id_contact,
                "ContentMess": req.body.content_reply
            }
            let SendMess = await method.MethodPost('/api/send/message', body, req.session.token);
            res.redirect(`/message`);
        }
    } catch (error) {
        res.redirect('/');
    }
}

let MessOfMe = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let notify = await method.MethodGet('/api/list/notify-slc', req.session.token);
            //let mess = await method.MethodGet('/api/message/unread', req.session.token);
            let mess = await method.MethodGet('/api/list/user/sendmess', req.session.token);
            let mess_user = await method.MethodGet('/api/list/message/get-send/' + req.params.id, req.session.token);
            //let all_user_mess = await method.MethodGet('/api/message/read', req.session.token);
            res.render('message_user', {
                avatar_home: data[0],
                notify: data[2],
                detail_notify: notify.data,
                num_mess: data[1],
                mess: mess.data,
                mess_user: mess_user.data,
                ModeBG: data[5]
            });

        }
    } catch (error) {
        res.redirect('/');
    }
}

let ReplyMess = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "IdUserGet": req.body.id_get,
                "ContentMess": req.body.content_mess
            }
            let SendMess = await method.MethodPost('/api/reply/message', body, req.session.token);
            res.redirect(`/mess_of_user/${req.body.id_get}`);
        }
    } catch (error) {
        res.redirect('/');
    }
}

let DetailMess = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let notify = await method.MethodGet('/api/list/notify-slc', req.session.token);
            //let mess = await method.MethodGet('/api/message/unread', req.session.token);
            let mess = await method.MethodGet('/api/list/user/sendmess', req.session.token);
            let mess_user = await method.MethodGet('/api/list/message/get-send/' + req.params.id, req.session.token);
            //let all_user_mess = await method.MethodGet('/api/message/read', req.session.token);
            res.render('message_all_read', {
                avatar_home: data[0],
                notify: data[2],
                detail_notify: notify.data,
                num_mess: data[1],
                mess: mess.data,
                mess_user: mess_user.data,
                ModeBG: data[5]
            });

        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    Message: Message,
    SendMessage: SendMessage,
    MessOfMe: MessOfMe,
    ReplyMess: ReplyMess,
    DetailMess: DetailMess
}