const { render } = require("ejs");
const method = require('./MethodController');
const dateFormat = require('dateformat');
const controller = require('./Controller');

let Search = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let body = {
                "search": req.body.search
            }
            let search_user = await method.MethodPost('/api/search/user', body, req.session.token);
            let search_post = await method.MethodPost('/api/search/post', body, req.session.token);
            res.render('search', {
                avatar_home: data[0],
                data_10_post: data[3],
                data_user: search_user.data,
                data_post: search_post.data,
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            });

        }
    } catch (error) {
        res.redirect('/');
    }
}

let SearchPostPersonel = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "search": req.body.search
            }
            let search_post = await method.MethodPost('/api/search/post-personel', body, req.session.token);
            let data = await controller.ArrayData(req.session.token);
            let listAvataMe = await method.MethodGet('/api/list/avatar', req.session.token);
            res.render('personel_page', {
                avatar_home: data[0],
                data_user: data[0],
                data: search_post.data,
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

let SearchDate = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let body = {
                "searchDate": req.body.search_date
            }
            let search_date = await method.MethodPost('/api/search/date', body, req.session.token);
            res.render('search_date', {
                avatar_home: data[0],
                data_10_post: data[3],
                notify: data[2],
                data: search_date.data,
                data_s_l_c: data[4],
                num_mess: data[1],
                date_search: dateFormat(req.body.search_date, "dd mm yyyy"),
                ModeBG: data[5]
            });


        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    Search: Search,
    SearchDate: SearchDate,
    SearchPostPersonel: SearchPostPersonel
}