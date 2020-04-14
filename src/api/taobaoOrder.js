import api from "./config/httpConfig";

const urls = {
    list: "/tbk/order/search",//淘宝订单列表
    detail: "/tbk/order/detail",//淘宝订单详情
    exportOrder: "/tbk/order/export",//订单导出
    commission: "/tbk/order/commission-list",//分佣列表
    uploadRefund: "/tbk/order/import-refund",//上传维权订单

};

const getTutorialList = function (data) {
    return api.get(urls.list,data);
};

const detailTutorial = function (data) {
    return api.get(urls.detail, data);
};

const exportTutorial = function (data) {
    return api.get(urls.exportOrder, data);
};

const commissionTutorial = function (data) {
    return api.get(urls.commission, data);
};

const uploadRefundTutorial = function (data) {
    return api.post(urls.uploadRefund, data);
};

export default {
    getTutorialList,
    detailTutorial,
    exportTutorial,
    commissionTutorial,
    uploadRefundTutorial
};
