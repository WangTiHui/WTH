import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/login";
import decoration from "./modules/decoration";
import modals from "./modules/modals";
import goodsblock from "./modules/goodsblock";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    AsideMenuCollapse: false,
    CrumbList: [],
    userInfo:"",
    chat:{},
	messageNumbers:0
  },
  mutations: {
    toggleAsideMenuCollapse(state) {
      state.AsideMenuCollapse = !state.AsideMenuCollapse;
    },
    USERINFO(state,data){
      state.userInfo = data;
    },
    setCrumbList(state, list) {
      state.CrumbList = list;
    },
    updateUserInfo(state,data){
      state.userInfo = data
    },
	getMessagenum(state,data) {
		state.messageNumbers = data;
	}
  },

  actions: {
    login(store){
      return api.userInfo().then((res)=>{
        store.commit("USERINFO",res);
        return Promise.resolve(res);
      })
    },
    loginOut(){
      localStorage.clear("token_gwt");
    },
	getMessaged(commit) {
		return new Promise(function (resolve, reject) {
			return api.getUser1({target_type:1,page:1,page_size:5}).then(res=>{
				resolve(res.not_read_count)
			})
		}).then(function (r) {
			api.getUser1({target_type:3,page:1,page_size:5}).then(res=>{
				commit.commit("getMessagenum",r+res.not_read_count);
			})
		}).catch(function (reason) {
			console.log('Failed: ' + reason);
		});
	}
  },
  modules: {
    decoration,
    modals,
    goodsblock
  }
});
