const { render } = require("ejs");
const method = require('./MethodController');
const controller = require('./Controller');

let infoPersonel = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let dataUser = await method.MethodGet('/api/info/' + req.params.id, req.session.token);
            let listPostUser = await method.MethodGet('/api/list/post/user/' + req.params.id, req.session.token);
            let listAvataUser = await method.MethodGet('/api/list/avatar/user/' + req.params.id, req.session.token);
            let checkFollow = await method.MethodGet('/api/check/follow/' + req.params.id, req.session.token);
            res.render('info_pesonel', {
                avatar_home: data[0],
                data_user: dataUser.data,
                data: listPostUser.data,
                avatar: listAvataUser.data,
                data_s_l_c: data[4],
                notify: data[2],
                follow: checkFollow.data,
                num_mess: data[1],
                ModeBG: data[5]
            })
        }
    } catch (error) {
        res.redirect('/');
    }
}

let PersonelPage = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let listPostMe = await method.MethodGet('/api/list/post/me', req.session.token);
            let listAvataMe = await method.MethodGet('/api/list/avatar', req.session.token);
            res.render('personel_page', {
                avatar_home: data[0],
                data_user: data[0],
                data: listPostMe.data,
                data_s_l_c: data[4],
                avatar: listAvataMe.data,
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/');
    }
}

let ListAuthor = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let listAllUser = await method.MethodGet('/api/list-user', req.session.token);
            res.render('list_author', {
                avatar_home: data[0],
                data_10_post: data[3],
                data_user: listAllUser.data || [],
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
    infoPersonel: infoPersonel,
    PersonelPage: PersonelPage,
    ListAuthor: ListAuthor
}