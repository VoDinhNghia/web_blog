const { render } = require("ejs");
const method = require('./MethodController');
const sendMailPass = require('./Controller');

let login = async(req, res) => {
    res.render('login', {
        message: 'Please fill into the fields below.'
    });
}

let signUp = async(req, res) => {
    res.render('signUp', {
        message: 'Please fill in the fields below.'
    });
}

let TermsOfService = async(req, res) => {
    res.render('terms_of_service');
}

let getPassWord = async(req, res) => {
    res.render('getpass', {
        message: 'Please fill in the fields below.'
    });
}

let signUpAccount = async(req, res) => {
    let data = await method.MethodPost('/api/auth/register', req.body, '');
    if (data.status == true && data.code == 0) {
        res.redirect('/')
    } else {
        res.render('signUp', {
            message: data.message
        });
    }
}

let sendPassToMail = async(req, res) => {
    let data = await method.MethodPost('/api/getpass', req.body, '');
    if (data.status == true && data.code == 0) {
        //let sendPass = sendMailPass.SendPassMail(req.body.UserName, req.body.EmailUser, data.message);
        res.redirect('/')
    } else {
        res.render('getpass', {
            message: data.message
        });
    }
}

let LoginSuccess = async(req, res) => {
    let DataUserLogin = {
        UserName: req.body.Username,
        PassWord: req.body.Password,
        DeviceLogin: req.headers['user-agent']
    };
    let data = await method.MethodPost('/api/auth/login', DataUserLogin, '');
    if (data.status == true && data.code == 0) {
        req.session.loggedin = true;
        req.session.username = data.data.Name;
        req.session.token = data.data.Token;
        res.cookie('username', data.data.Name);
        res.cookie('token', data.data.Token);
        res.redirect('/home')
    } else {
        res.render("login", {
            message: data.message
        });
    }
}

let Logout = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let logout = await method.MethodPost('/api/auth/logout', {}, req.session.token);
            req.session.destroy();
            res.redirect('/');
        }
    } catch (error) {
        res.redirect('/');
    }
}

module.exports = {
    login: login,
    LoginSuccess: LoginSuccess,
    signUp: signUp,
    signUpAccount: signUpAccount,
    getPassWord: getPassWord,
    sendPassToMail: sendPassToMail,
    Logout: Logout,
    TermsOfService: TermsOfService
}