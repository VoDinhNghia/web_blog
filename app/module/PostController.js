const { render } = require("ejs");
const method = require('./MethodController');
const controller = require('./Controller');
const upload = require("./UploadFile");
const fs = require('fs');
const { url } = require("inspector");

let formPost = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let avatar = await method.MethodGet('/api/list/avatar', req.session.token);
            res.render('formpost', {
                avatar_home: data[0],
                data_user: data[0],
                avatar: avatar.data,
                notify: data[2],
                num_mess: data[1],
                ModeBG: data[5]
            })
        }
    } catch (error) {
        res.redirect('/');
    }
}

let newPost = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            upload.Upload(req, res, async(err) => {
                if (err) {
                    res.send({ msg: err });
                } else {
                    if (req.file != undefined) { file_image = `/images/uploads/${req.file.filename}`; } else { file_image = '' }
                    if (req.body.privacy == 'private') { privacy = 1 } else { privacy = 0 }
                    if (req.body.title_post == '') { title_post = 'Not title' } else { title_post = req.body.title_post }
                    let content = req.body.content_post;
                    let checkTitle = req.body.title_post;
                    let body = {
                        "TitlePost": checkTitle,
                        "ContentPost": content,
                        "FileImage": file_image,
                        "Privacy": privacy
                    }
                    let PostNew = await method.MethodPost('/api/new/post', body, req.session.token);
                    res.redirect('/home');
                }
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let infoPost = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let data_info_post = await method.MethodGet('/api/info-post/' + req.params.id, req.session.token);
            if (data_info_post.status == true) {
                res.render('info_post', {
                    avatar_home: data[0],
                    data_10_post: data[3],
                    data: data_info_post.data,
                    data_s_l_c: data[4],
                    notify: data[2],
                    num_mess: data[1],
                    ModeBG: data[5]
                });
            } else {
                res.send(data_info_post)
            }

        }
    } catch (error) {
        res.redirect('/');
    }
}

let Like = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data_info_post = await method.MethodGet('/api/like/post/' + req.params.id, req.session.token);
            if (data_info_post.status == true) {
                let urlPath = (req.headers.referer).split('/');
                if (req.params.page_current == 'home') {
                    if (urlPath[3] == 'home') {
                        res.redirect(`/home/#return_after_like${req.params.id}`)
                    } else {
                        res.redirect(`/nextpage/${urlPath[4]}#return_after_like${req.params.id}`)
                    }
                } else if (req.params.page_current == 'info_personel') {
                    res.redirect(`/info/post/${req.params.id}`)
                } else if (req.params.page_current == 'personel_page') {
                    res.redirect(`/personel/page/#return_after_like${req.params.id}`)
                } else if (req.params.page_current == 'manage_follow') {
                    res.redirect(`/manager/follow/#return_after_like${req.params.id}`)
                } else {
                    res.redirect(`/info/post/${req.params.id}`)
                }
            } else {
                res.send(data_info_post)
            }

        }
    } catch (error) {
        res.redirect('/');
    }
}

let Comments = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let content = req.body.content_comment;
            let body = {
                "IdPost": req.body.id_post,
                "Comment": content
            }
            let comment_post = await method.MethodPost('/api/comment/post/', body, req.session.token);
            if (comment_post.status == true) {
                let urlPath = (req.headers.referer).split('/');
                if (req.params.id == 'home') {
                    if (urlPath[3] == 'home') {
                        res.redirect(`/home/#return_after_comment${req.params.idpost}`)
                    } else {
                        res.redirect(`/nextpage/${urlPath[4]}#return_after_comment${req.params.idpost}`)
                    }
                } else if (req.params.id == 'info_personel') {
                    res.redirect(`/info/post/${req.params.idpost}`)
                } else if (req.params.id == 'manage_follow') {
                    res.redirect(`/manager/follow/#return_after_comment${req.params.idpost}`)
                } else if (req.params.id == 'personel_page') {
                    res.redirect(`/personel/page/#return_after_comment${req.params.idpost}`)
                } else {
                    res.redirect(`/info/post/${req.params.idpost}`)
                }
            } else {
                res.send(comment_post)
            }

        }
    } catch (error) {
        res.redirect('/');
    }
}

let PageEditPost = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let listAvataMe = await method.MethodGet('/api/list/avatar', req.session.token);
            let InfoPost = await method.MethodGet('/api/info-post/' + req.params.id, req.session.token);
            res.render('edit_post', {
                avatar_home: data[0],
                data_user: data[0],
                data_post: InfoPost.data,
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

let EditPost = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            upload.Upload(req, res, async(err) => {
                if (err) { res.send({ msg: err }); } else {
                    let find_image_listpost = await method.MethodGet('/api/info-post/' + req.body.id_post, req.session.token);
                    if (req.body.privacy == 'public') { privacy = 0 } else { privacy = 1 }
                    let content = req.body.content_post;
                    let checkTitle = req.body.title_post;
                    if (req.file != undefined) {
                        file_image = `/images/uploads/${req.file.filename}`;
                        if (find_image_listpost.status == true) {
                            let InfoPost = find_image_listpost.data;
                            if ((InfoPost[0].Image != '') && (InfoPost[0].Image != file_image)) {
                                fs.unlinkSync('./public' + InfoPost[0].Image);
                            }
                            let body1 = {
                                "IdPost": req.body.id_post,
                                "TitlePost": checkTitle,
                                "ContentPost": content,
                                "FileImage": file_image,
                                "Privacy": privacy
                            }
                            let EditPostForMe = await method.MethodPost('/api/edit/post', body1, req.session.token)
                            res.redirect(`/personel/page/#return_after_like${req.params.id}`);
                        } else {
                            res.redirect('/home');
                        }
                    } else {
                        let InfoPost = find_image_listpost.data;
                        let body2 = {
                            "IdPost": req.body.id_post,
                            "TitlePost": checkTitle,
                            "ContentPost": content,
                            "FileImage": InfoPost[0].Image,
                            "Privacy": privacy
                        }
                        let EditPostForMed = await method.MethodPost('/api/edit/post', body2, req.session.token);
                        res.redirect(`/personel/page/#return_after_like${req.params.id}`);
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

let DeletePost = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let find_image_listpost = await method.MethodGet('/api/info-post/' + req.params.id, req.session.token);
            if (find_image_listpost.status == true) {
                let InfoPost = find_image_listpost.data;
                if (InfoPost[0].Image != '') {
                    fs.unlinkSync('./public' + InfoPost[0].Image);
                }
                let DeletePostForMe = await method.MethodDelete('/api/delete/post/' + req.params.id, req.session.token)
                res.redirect('/personel/page');
            } else {
                res.redirect('/home');
            }

        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    newPost: newPost,
    formPost: formPost,
    infoPost: infoPost,
    Like: Like,
    Comments: Comments,
    PageEditPost: PageEditPost,
    EditPost: EditPost,
    DeletePost: DeletePost
}