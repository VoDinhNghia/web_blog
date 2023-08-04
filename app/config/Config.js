exports.cors = {
    origin: "*"
};

exports.environment = "local"; //local, product

exports.urlApi = 'http://localhost:8887'

exports.port = process.env.PORT || 8888;

exports.ConfigMail = {
    Email: 'sciencepost95@gmail.com',
    PassWord: '*******'
}
//check nếu user nhập những từ thô tục v
exports.checkContent = [];
