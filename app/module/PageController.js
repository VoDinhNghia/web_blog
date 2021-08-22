const { render } = require("ejs");
const method = require('./MethodController');
const controller = require('./Controller');

let home = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let pagination = await controller.Pagination(req.session.token, 1);
            let numRows = parseInt(pagination[1].length);
            let numPerPage = 10;
            let numPages = parseInt(Math.ceil(numRows / numPerPage));
            res.render('home', {
                avatar_home: data[0],
                data: pagination[0],
                data_10_post: data[3],
                numPages: numPages,
                data_s_l_c: data[4],
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

let nextPage = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let numPerPage = 10;
            let pagination = await controller.Pagination(req.session.token, parseInt(req.params.id));
            let numRows = parseInt(pagination[1].length);
            let numPages = parseInt(Math.ceil(numRows / numPerPage));
            res.render('home', {
                avatar_home: data[0],
                data: pagination[0],
                data_10_post: data[3],
                numPages: numPages,
                data_s_l_c: data[4],
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = {
    home: home,
    nextPage: nextPage
}