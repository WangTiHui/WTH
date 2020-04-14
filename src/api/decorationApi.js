import api from "./config/httpConfig";

const urls = {
  component: "/component/get-official-component",
  link: "/component/get-link-list",
  catlist: "/category/list",
  detail: "/template/detail",
  save: "/template/save"
};

const getComponentList = function(data) {
  return api.get(urls.component, data);
};

const getFunctionList = function() {
  return api.get(urls.link);
};

const getCatgoryList = function(data) {
  return api.get(urls.catlist, data);
};

const getDecorationDetail = function(data) {
  return api.get(urls.detail, data);
};

const saveDecoration = function(data) {
  return api.postjson(urls.save, data);
};

export default {
  getComponentList,
  getFunctionList,
  getCatgoryList,
  getDecorationDetail,
  saveDecoration
};
