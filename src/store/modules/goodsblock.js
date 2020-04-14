import api from "@/api/goodsblockApi";

const state = {
  styleList: [],
  goodsBlockList: []
};


const mutations = {
  SET_STYLELIST: (state, val) => {
    state.styleList = val;
  },
  SET_GOODSBLOCKLIST: (state, val) => {
    state.goodsBlockList = val;
  },
  SET_GOODSBLOCKDETAIL: (state, val) => {
    state.goodsBlockDetail = val;
  }
};

const actions = {
  getGoodsBlockStyleList: ({ commit }) => {
    api.getGoodsBlockStyleList().then(res => {
      commit("SET_STYLELIST", res);
    });
  },
  getGoodsBlockPage: ({ commit },data) => {
    return api.getGoodsBlockPage(data).then(res => {
         return Promise.resolve(res)
    });
  },

  getGoodsBlockList: ({ commit }) => {
    api.getGoodsBlock().then(res => {
      commit("SET_GOODSBLOCKLIST", res);
    });
  }
};

const getters = {};

export default {
  namespaced: true,
  namespace: "goodsblock",
  state,
  mutations,
  getters,
  actions
};
