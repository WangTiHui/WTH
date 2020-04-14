import api from "./config/httpConfig";

const urls = {
  list: "/template/list",
  add: "/template/add",
  clone: "/template/clone",
  delete: "/template/delete",
  update: "/template/edit"
};

const getProjectList = function() {
  return api.get(urls.list);
};

const addProject = function(data) {
  return api.post(urls.add, data);
};

const cloneProject = function(data) {
  return api.post(urls.clone, data);
};

const deleteProject = function(data) {
  return api.post(urls.delete, data);
};

const updateProject = function(data) {
  return api.post(urls.update, data);
};

export default {
  getProjectList,
  addProject,
  cloneProject,
  deleteProject,
  updateProject
};
