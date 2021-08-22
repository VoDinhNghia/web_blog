const { render } = require("ejs");
const axios = require('axios');
const url = require('../config/Config').urlApi;

function urlRequest(path) {
    return url + path;
}

let MethodGet = async(path, token) => {
    if (token == "") {
        console.log("chua lam");
    } else {
        let header = { 'headers': { 'authorization': `Bearer ${token}` } }
        let response = await axios.get(urlRequest(path), headers = header)
        return response.data
    }
}

let MethodDelete = async(path, token) => {
    if (token == "") {
        console.log("chua lam");
    } else {
        let header = { 'headers': { 'authorization': `Bearer ${token}` } }
        let response = await axios.delete(urlRequest(path), headers = header)
        return response.data
    }
}

let MethodPost = async(path, dataBody, token) => {
    if (token == '') {
        let response = await axios.post(urlRequest(path), dataBody);
        return response.data
    } else {
        let header = { 'headers': { 'authorization': `Bearer ${token}` } }
        let response = await axios.post(urlRequest(path), dataBody, headers = header);
        return response.data
    }
}

let MethodPut = async(path, dataBody, token) => {
    if (token == '') {
        let response = await axios.putt(urlRequest(path), dataBody);
        return response.data
    } else {
        let header = { 'headers': { 'authorization': `Bearer ${token}` } }
        let response = await axios.put(urlRequest(path), dataBody, headers = header);
        return response.data
    }
}

module.exports = {
    MethodGet: MethodGet,
    MethodPost: MethodPost,
    MethodPut: MethodPut,
    MethodDelete: MethodDelete
}