import api from "./config/httpConfig";

const urls = {
  upload: "/oss/upload",
  uploadload: "/common/upload-image",
  list: "/oss/list"
};

const uploadImage = function(data) {
  return api.postfile(urls.upload, data);
};

const uploadImages = function(data) {
  return api.postfile(urls.uploadload, data);
};

const getOssImageList = function(data) {
  return api.get(urls.list, data);
};

export default {
  uploadImage,
  getOssImageList,
  uploadImages
};
