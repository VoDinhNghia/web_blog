const { render } = require("ejs");
const axios = require('axios');
const method = require('./MethodController');
const nodemailer = require('nodemailer');
const ConfigMail = require('../config/Config').ConfigMail;

let SendPassMail = function(UserName, EmailGetPass, PassWord) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: ConfigMail.Email,
            pass: ConfigMail.PassWord
        }
    });
    var mailOptions = {
        from: ConfigMail.Email,
        to: EmailGetPass,
        subject: `Send password to user ${UserName}`,
        text: `Your password is ${PassWord}, please login againt and change password.`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Message sent: ${info.response}`);
        };
    });

}


let ArrayData = async(token) => {
    let InfoMe = await method.MethodGet('/api/auth/me', token);
    let NumMess = await method.MethodGet('/api/notify/message', token);
    let NotifySLC = await method.MethodGet('/api/notify/sharelikecomment', token);
    let List10NewPost = await method.MethodGet('/api/list/ten-post', token);
    let ListSLC = await method.MethodGet('/api/data/sharelikecomment', token);
    let ModeBG = await method.MethodGet('/api/get/background', token);
    let checkMode = 'light';
    try {
        if ((ModeBG.data)[0] == undefined) {
            checkMode = checkMode
        } else if ((ModeBG.data)[0].Mode == 'dark') {
            checkMode = 'dark'
        } else {
            checkMode = checkMode
        }
    } catch (error) {
        checkMode = checkMode
    }
    return [InfoMe.data, NumMess.data, NotifySLC.data, List10NewPost.data, ListSLC.data, checkMode];
}

let Pagination = async(token, pageAddress) => {
    let PaginationPage = await method.MethodGet('/api/pagination-page/' + pageAddress, token);
    let AllPost = await method.MethodGet('/api/list-post', token);
    return [PaginationPage.data, AllPost.data]
}

module.exports = {
    ArrayData: ArrayData,
    Pagination: Pagination,
    SendPassMail: SendPassMail
}