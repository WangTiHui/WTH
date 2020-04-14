import api from "./config/httpConfig";

const urls = {
    list: "/withdraw/search",//提现列表 
    audit: "/withdraw/audit",//单条审核
    audits: "/withdraw/audit-pass",//批量审核通过
    drawIndex: "/reflect/index",//提现首页
    draw: "/reflect/add",//提现申请
    edit: "/reflect/alipay-add",//绑定/修改 支付宝
};

const getTutorialList = function (data) {
    return api.get(urls.list,data);
};

const auditTutorial = function (data) {
    return api.posts(urls.audit, data);
};

const auditsTutorial = function (data) {
    return api.posts(urls.audits, data);
};

const drawIndexTutorial = function (data) {
    return api.posts(urls.drawIndex, data);
};

const drawTutorial = function (data) {
    return api.posts(urls.draw, data);
};

const editTutorial = function (data) {
    return api.posts(urls.enable, data);
};
export default {
    getTutorialList,
    auditTutorial,
    auditsTutorial,
    drawIndexTutorial,
    drawTutorial,
    editTutorial,
};
