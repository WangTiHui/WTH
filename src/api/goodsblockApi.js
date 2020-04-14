import api from "./config/httpConfig";

const urls = {
  list: "/good-block/list",
  page: "/good-block/list-page",
  add: "/good-block/add",
  update: "/good-block/edit",
  delete: "/good-block/delete",
  style: "/good-block/get-list-style-map",
  detail: "/good-block/get-good-block"
};

const getGoodsBlock = function() {
  return api.get(urls.list);
};
const getGoodsBlockPage = function(data) {
  return api.get(urls.page,data);
};
const addGoodsBlock = function(data) {
  return api.postjson(urls.add, data);
};

const updateGoodsBlock = function(data) {
  return api.postjson(urls.update, data);
};

const deleteGoodsBlock = function(data) {
  return api.post(urls.delete, data);
};

const getGoodsBlockStyleList = function() {
  return api.get(urls.style);
};

const getGoodsBlockDetail = function(data) {
  return api.get(urls.detail, data);
};
export default {
  getGoodsBlock,
  addGoodsBlock,
  updateGoodsBlock,
  deleteGoodsBlock,
  getGoodsBlockStyleList,
  getGoodsBlockDetail,
  getGoodsBlockPage
};
