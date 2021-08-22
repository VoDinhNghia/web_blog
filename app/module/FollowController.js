const { render } = require("ejs");
const method = require('./MethodController');
const dateFormat = require('dateformat');
const controller = require('./Controller');

let Follow = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let follow = await method.MethodGet('/api/follow/' + req.params.id, req.session.token);
            res.redirect(`/info/personel/${req.params.id}`)
        }
    } catch (error) {
        res.redirect('/');
    }
}

let RemoveFollow = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let follow = await method.MethodDelete('/api/delete/follow/' + req.params.id, req.session.token);
            res.redirect(`/info/personel/${req.params.id}`)
        }
    } catch (error) {
        res.redirect('/');
    }
}

let ManagerFollow = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let post_user_follow = await method.MethodGet('/api/list/post/user-follow', req.session.token);
            res.render('manager_follow', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                data: post_user_follow.data,
                data_s_l_c: data[4],
                num_mess: data[1],
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/');
    }
}

let ListYouFollow = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let list_follow = await method.MethodGet('/api/list/me-follow', req.session.token);
            console.log(list_follow);
            res.render('list_you_following', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                list_follow: list_follow.data,
                num_mess: data[1],
                ModeBG: data[5]
            })
        }
    } catch (error) {
        res.redirect('/');
    }
}

let ListFollowMe = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let list_follow = await method.MethodGet('/api/list/user/follow-me', req.session.token);
            res.render('list_following_you', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                list_user_follow: list_follow.data,
                num_mess: data[1],
                ModeBG: data[5]
            })
        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    Follow: Follow,
    RemoveFollow: RemoveFollow,
    ManagerFollow: ManagerFollow,
    ListYouFollow: ListYouFollow,
    ListFollowMe: ListFollowMe
}