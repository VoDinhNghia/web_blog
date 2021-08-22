const express = require('express');
const app = express();
const { render } = require('ejs');
require('./app/config/global');
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
var session = require('express-session');
app.use(session({
    secret: 'dhhd 0192 nghia',
    resave: true,
    saveUninitialized: true
}));


const AuthController = require('./app/module/AuthController');
const PageController = require('./app/module/PageController');
const PostController = require('./app/module/PostController');
const UpdateController = require('./app/module/UpdateController');
const UserController = require('./app/module/UserController');
const SearchController = require('./app/module/SearchController');
const FollowController = require('./app/module/FollowController');
const ContactController = require('./app/module/ContacController');
const NotifyController = require('./app/module/NotifyController');
const MessageController = require('./app/module/MessageController');
const StudyController = require('./app/module/StudyController');
const Background = require('./app/module/Background');

app.get('/', AuthController.login);
app.post('/login/sucsses', AuthController.LoginSuccess);
app.get('/termsOfsevice/website', AuthController.TermsOfService);
app.get('/home', PageController.home);
app.get('/signup', AuthController.signUp);
app.post('/signup/account', AuthController.signUpAccount);
app.get('/getpass', AuthController.getPassWord);
app.post('/sendPass', AuthController.sendPassToMail);
app.get('/formpost', PostController.formPost);
app.get('/nextpage/:id', PageController.nextPage);
app.post('/newpost', PostController.newPost);
app.get('/like/:id/:page_current', PostController.Like);
app.post('/comments/:id/:idpost', PostController.Comments);
app.get('/info/post/:id', PostController.infoPost);
app.get('/delete/avatar/:id', UpdateController.DelAvatar);
app.get('/change/avatar/:id', UpdateController.changeAvatar);
app.post('/update/profile', UpdateController.updateProfile);
app.get('/info/personel/:id', UserController.infoPersonel);
app.get('/personel/page', UserController.PersonelPage);
app.get('/page/edit/post/:id', PostController.PageEditPost);
app.post('/edit/post/:id', PostController.EditPost);
app.get('/delete/post/:id', PostController.DeletePost);
app.get('/list/author', UserController.ListAuthor);
app.post('/search', SearchController.Search);
app.post('/search/date', SearchController.SearchDate);
app.post('/search/post-personel', SearchController.SearchPostPersonel);
app.get('/follow/:id', FollowController.Follow);
app.get('/remove/follow/:id', FollowController.RemoveFollow);
app.get('/manager/follow', FollowController.ManagerFollow);
app.get('/list/you/following', FollowController.ListYouFollow);
app.get('/list/following/you', FollowController.ListFollowMe);
app.get('/contact', ContactController.Contact);
app.post('/submit/contact', ContactController.SubmitContact);
app.get('/notify/user', NotifyController.Notify);
app.get('/detail/notify/:id_post/:id', NotifyController.DetailNotify);
app.get('/message', MessageController.Message);
app.post('/send_message', MessageController.SendMessage);
app.get('/mess_of_user/:id', MessageController.MessOfMe);
app.get('/message/read-all/:id', MessageController.DetailMess);
app.post('/reply_message', MessageController.ReplyMess);
app.post('/change/password', UpdateController.Changpassword);
app.get('/manage/studyOfMe', StudyController.studyOfMe);
app.post('/create/topic', StudyController.CreateTopic);
app.post('/update/topic', StudyController.UpdateTopic);
app.get('/delete/topic/:id', StudyController.DeleteTopic);
app.get('/restore/topic/:id', StudyController.RestoreTopic);
app.get('/topic/ofMe/:id', StudyController.DetailTopic);
app.post('/create/problem', StudyController.CreateProlem);
app.get('/solution/for-problem/:id', StudyController.DetailProblem);
app.post('/create/solution', StudyController.CreateSolution);
app.get('/delete/solution/:id/:idproblem', StudyController.DeleteSolution);
app.get('/delete/problem/:id/:idtopic', StudyController.DeleteProblem);
app.get('/destroy/topic/:id', StudyController.DestroyTopic);
app.get('/mybook', StudyController.Mybook);
app.get('/embed/search/article', StudyController.googleSchoolar);
app.get('/myschedule', StudyController.MySchedule);
app.post('/add/myschedule', StudyController.AddSchedule);
app.post('/edit/myschedule', StudyController.EditSchedule);
app.get('/delete/myschedule/:id', StudyController.DeleteSchedule);
app.post('/change/background', Background.ChangeBackground);
app.get('/logout', AuthController.Logout);
//app.get('/detail_mess_send/:id', MessageController.DetailMess);

app.use((req, res, next) => {
    let err = new Error('Page not found.');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status | 500);
    res.send(err.message);
});
let port = require('./app/config/Config').port;
const { MethodDelete } = require('./app/module/MethodController');
const server = app.listen(port, function() {
    const host = server.address().port;
    console.log("Server on port: " + host);
});