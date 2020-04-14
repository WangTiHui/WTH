import api from "./config/httpConfig";

const urls = {
    list: "/config/tutorial/search",//教程中心列表
    add: "/config/tutorial/add",//添加教程
    detail: "/config/tutorial/detail",//教程详情
    delete: "/config/tutorial/delete",//删除教程
    update: "/config/tutorial/update",//编辑教程
    enable: "/config/tutorial/enable",//教程中心列表是否启用
    sort: "/config/tutorial/sort",//教程中心列表排序
    uploadCover: "/config/tutorial/upload-cover",//上传封面图
    uploadVideo: "/config/tutorial/upload-video",//上传视频
};

const getTutorialList = function (data) {
    return api.get(urls.list,data);
};

const addTutorial = function (data) {
    return api.post(urls.add, data);
};

const detailTutorial = function (data) {
    return api.get(urls.detail, data);
};

const deleteTutorial = function (data) {
    return api.posts(urls.delete, data);
};

const updateTutorial = function (data) {
    return api.post(urls.update, data);
};

const enableTutorial = function (data) {
    return api.post(urls.enable, data);
};

const sortTutorial = function (data) {
    return api.get(urls.sort, data);
};

const uploadCoverTutorial = function (data) {
    return api.post(urls.uploadCover, data);
};

const uploadVideoTutorial = function (data) {
    return api.post(urls.uploadVideo, data);
};

const reqExp = function(value){
    return value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
}
export default {
    getTutorialList,
    addTutorial,
    detailTutorial,
    deleteTutorial,
    updateTutorial,
    enableTutorial,
    sortTutorial,
    uploadCoverTutorial,
    uploadVideoTutorial
};
