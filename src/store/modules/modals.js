import api from "@/api/decorationApi";

const state = {
  showFuncModal: false,
  linkList: null,
  funcItem: null
};

const mutations = {
  SET_FUNCMODAL: (state, show) => {
    state.showFuncModal = show;
  },
  SET_LINKLIST: (state, list) => {
    state.linkList = list;
  },
  SET_FUNCITEM: (state, val) => {
    state.funcItem = val;
  },
  SET_FUNCTION: (state, val) => {
    state.funcItem && (state.funcItem.function = val);
    // state.funcItem = null;
  }
};

const actions = {
  getLinkList(store) {
    api.getFunctionList().then(res => {
      console.log(res);
      store.commit("SET_LINKLIST", res);
    });
  }
};

const getters = {};

export default {
  namespaced: true,
  namespace: "modals",
  state,
  mutations,
  getters,
  actions
};
