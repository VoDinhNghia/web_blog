const { render } = require("ejs");
const method = require('./MethodController');
const controller = require('./Controller');
const upload = require("./UploadFile");
const fs = require('fs');

let updateProfile = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            upload.AvatarUpload(req, res, async(err) => {
                if (err) {
                    res.send({ msg: err });
                } else {
                    let data = await controller.ArrayData(req.session.token);
                    if (req.body.name == '') { name_ = data[0].Name; } else { name_ = req.body.name; }
                    if (req.body.gender == 'Male') { gender = 1 } else if (req.body.gender == 'Female') {
                        gender = 0
                    } else { gender = data[0].Gender };
                    if (req.body.email == '') { email = data[0].Email; } else { email = req.body.email; }
                    if (req.body.mobile == '') { mobile = data[0].Mobile; } else { mobile = req.body.mobile; }
                    if (req.body.country == '') { country = data[0].Country; } else { country = req.body.country; }
                    if (req.file == undefined) { file_image = data[0].Avatar; } else {
                        file_image = `/images/avatars/${req.file.filename}`;
                        let body = {
                            "Avatar": file_image
                        }
                        let InsertAvatar = await method.MethodPost('/api/insert/avatar', body, req.session.token);
                    }
                    let body = {
                        "UserName": name_,
                        "Mobile": mobile,
                        "Gender": gender,
                        "Avatar": file_image,
                        "Country": country
                    }
                    let UpdateProfile = await method.MethodPut('/api/update/profile', body, req.session.token);
                    res.redirect('/personel/page');
                }
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let DelAvatar = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let listAvatar = await method.MethodGet('/api/list/avatar', req.session.token);
            if (listAvatar.status == true) {
                let ArrayAvata = listAvatar.data
                for (let i = 0; i < ArrayAvata.length; i++) {
                    if (ArrayAvata[i].ID == req.params.id) {
                        let delAvatar = await method.MethodDelete('/api/delete/avatar/' + req.params.id, req.session.token);
                        fs.unlinkSync('./public' + ArrayAvata[i].ImageUpdate);
                    }
                }
                res.redirect('/personel/page')
            } else {
                res.send({ msg: "delete fail." })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let changeAvatar = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let listAvatar = await method.MethodGet('/api/list/avatar', req.session.token);
            if (listAvatar.status == true) {
                let ArrayAvata = listAvatar.data
                for (let i = 0; i < ArrayAvata.length; i++) {
                    if (ArrayAvata[i].ID == req.params.id) {
                        let updateAvatar = await method.MethodGet('/api/update/avatar/' + req.params.id, req.session.token);
                    }
                }
                res.redirect('/personel/page')
            } else {
                res.send(listAvatar)
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let Changpassword = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "CurrentPass": req.body.current_pass,
                "NewPassword": req.body.new_pass
            }
            let changePass = await method.MethodPut('/api/update/change-password', body, req.session.token);
            if (changePass.status == true) {
                res.render('login', {
                    message: 'Change password success, please login againt.'
                });
            } else {
                res.render('login', {
                    message: changePass.message
                });
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = {
    updateProfile: updateProfile,
    DelAvatar: DelAvatar,
    changeAvatar: changeAvatar,
    Changpassword: Changpassword
}