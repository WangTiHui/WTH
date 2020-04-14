import axios from "axios";
import QS from "querystring";
import store from "@/store/index.js";
import baseURL from "./baseUrl";
import router from "@/router";
import { Message } from "element-ui";
const http = {};

var instance = axios.create({
  timeout: 5000,
  baseURL,
});
// 添加请求拦截器
instance.interceptors.request.use(
    function(config) {
      if(localStorage.token_gwt){
        config.headers['X-Api-Key'] = localStorage.token_gwt;
      }else{
        router.push({name:"login"})
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
);


// 响应拦截器即异常处理
var cont = 0;
instance.interceptors.response.use(
    response => {
      if(response.data.code==401){
        if (cont==0) {
          // Message.error({
          //   message:"登录超时，重新登录！"
          // });
          store.dispatch("loginOut");
          router.push({name:"login"})
        }
        cont = 1;
        return;
      }else{
        cont = 0;
        return response.data;
      }
    },
    err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = "请求出错";
            break;
          case 401:
            Message.warning({
              message: "授权失败，请重新登录"
            });
            store.commit("LOGIN_OUT");
            setTimeout(() => {
              router.push({name:"login"})
            }, 1000);

            return;
          case 403:
            err.message = "拒绝访问";
            break;
          case 404:
            err.message = "请求错误,未找到该资源";
            break;
		  case 405:
			  Message.warning({
			    message: "此账号已被禁用"
			  });
			  store.commit("LOGIN_OUT");
			  setTimeout(() => {
			    router.push({name:"login"})
			  }, 1000);
			  return;
          case 500:
            err.message = "服务器端出错";
            break;
        }
      } else {
        err.message = "连接服务器失败";
      }
      Message.error({
        message: err.message
      });
      return Promise.reject(err.response);
    }
);

http.get = function(url, data, config) {

  return instance.get(url, { params: data }, {

  }).then(res => {
    if (res.code === 200) {
      return res.data;
    }else {
      return Promise.reject(res.message);
    }
  });
};

http.post = function(url, data, config) {
//  console.log(data,"data")
  return instance.post(url, QS.stringify(data), {

  }).then(res => {
    if (res.code === 200){
      return res.data;
    }else if (res.code==4000){
       Message.error({
        message:res.message
      });
    }else {
      return Promise.reject(res.message);
    }
  });
};
http.posts = function(url, data, config) {
    // console.log(data,"data")
  return instance.post(url, data, {

  }).then(res => {
    if (res.code === 200){
      return res.data;
    } else if(res.code==4000){
      Message.error({
        message:res.username
      });
    }
    else {
      return Promise.reject(res.message);
    }
  });
};
http.postfile = function(url, data = {}) {
  return instance
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.code === 200) {
          return res.data;
        } else {
          return Promise.reject(res.message);
        }
      });
};
http.postjson = function(url, data = {}) {
  return instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.code === 200) {
          return res.data;
        } else {
          return Promise.reject(res.message);
        }
      });
};

export default http;
