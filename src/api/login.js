import api from "./config/httpConfig";

const urls = {
    login: "/user/login",
    userInfo:"/user/profile",
	usermessage:"/user/message-list",
};


const login = function(data) {
    return api.post(urls.login, data);
};

const userInfo = function(data) {
    return api.get(urls.userInfo, data);
};

const getUser1 = function(data) {
    return api.get(urls.usermessage, data);
};
export default {login,userInfo,getUser1};