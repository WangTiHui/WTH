import configlist from "@/static/configlist";
import userconfiglist from "@/static/userconfiglist";
import addcom, { filteritem } from "@/utils/addcom";
import debounce from "@/utils/debounce";
import api from "@/api/decorationApi";
import decorationdata from "@/static/decoration";

const state = {
  tabbar: {
    min: 2,
    max: 5,
    style_list: null,
    config_list: [
      {
        type: "tabbar",
        config: {
          active_icon: "",
          unactive_icon: "",
          business_id: 1
        },
        pages: {
          head: [],
          body: []
        }
      },
      {
        type: "tabbar",
        config: {
          active_icon: "",
          unactive_icon: "",
          business_id: 1
        },
        pages: {
          head: [],
          body: []
        }
      },
      {
        type: "tabbar",
        config: {
          active_icon: "",
          unactive_icon: "",
          business_id: 1
        },
        pages: {
          head: [],
          body: []
        }
      },
      {
        type: "tabbar",
        config: {
          active_icon: "",
          unactive_icon: "",
          business_id: 1
        },
        pages: {
          head: [],
          body: []
        }
      },
      {
        type: "tabbar",
        config: {
          active_icon: "",
          unactive_icon: "",
          business_id: 0
        },
        pages: "me"
      }
    ]
  },
  activeComponent: 0,
  activeTabbar: 0,
  active:null,//记住样式选择标识
  basicList: [],//左边基本组件
  basicList_user:[],//
  funcList: [],//左边功能组件
  styleList: [],//点击左边获取样式列表
  configList: [],//点击获取左边某一项
  categoryList: [],
  configListCopy:[],
  moanet:[]
};

const mutations = {
  SET_ACTIVECOMPONENT: (state, id) => {
    state.activeComponent = id;
  },
  SET_TABBAR: (state, val) => {
    state.tabbar.config_list = val;
  },
  DEL_TABBAR: (state, index) => {
    let list = state.tabbar.config_list;
    if (list.length <= state.tabbar.min) {
      return;
    }
    list.splice(index, 1);
    state.activeTabbar = 0;
  },
  ADD_TABBAR: state => {
    let list = state.tabbar.config_list;
    if (list.length >= state.tabbar.max) {
      return;
    }
    list.splice(list.length - 1, 0, {
      type: "tabbar",
      config: {
        active_icon: "",
        unactive_icon: "",
        business_id: 1
      },
      pages: {
        head: [],
        body: []
      }
    });
  },

  SET_ACTIVETABBAR: (state, val) => {
    state.activeTabbar = val;
  },
  //左边共基本组件、功能组件赋值
  SET_COMPONENTLIST: (state, list) => {
    state.basicList = list.basic;
    state.funcList = list.function;
  },
  SET_basicList_userGower:(state, list) => {
    state.basicList_user= list.basic;
  },
  SET_COMPONENTLIST_USER: (state) => {
    state.basicList =JSON.parse(JSON.stringify(state.basicList_user));
    state.funcList = []
  },

  SET_STYLELIST: (state, val) => {
    state.styleList = val;
  },
  //重置赋值
  resetting:(state, val)=>{
    state.configListCopy = val
  },
  //点击左边获取某一个选项
  SET_CONFIGLIST: (state, val) => {
    // console.log(val,"我热热热")
    state.configList = JSON.parse(JSON.stringify(val));
    state.configListCopy = JSON.stringify(val["style"][0]["config_list"].length>0?val["style"][0]["config_list"]:[])
  },
  //添加模块
  ADD_COMPONENT: debounce((state, val) => {
    addcom(state.tabbar.config_list[state.activeTabbar].pages, val);
  }),
  UPDATE_COMPONENT: debounce((state, val) => {
    let list =
      state.tabbar.config_list[state.activeTabbar].pages[val.params.pos];
    let component = filteritem(val.item);
    console.log(state.moanet.findIndex((item)=>item==val.item.parent_title_english),"大苏打撒旦")
    list.splice(list.indexOf(val.params.item), 1, component);
    state.moanet.splice(state.moanet.findIndex((item)=>item==val.item.parent_title_english),1)
    val.params.item = component;
  }),
  SET_APPBODYPAGE: (state, val) => {
    state.tabbar.config_list[state.activeTabbar].pages.body = val;
  },
  DEL_COMPONENT: (state, val) => {
    state.tabbar.config_list[state.activeTabbar].pages[val.pos].splice(
      val.index,
      1
    );
    delete state.configList.edit_params;
  },
  UPDATE_CONFIGLIST: (state, val) => {
    state.configList = val;
  },
  ADD_CONFIGITEM: (state, id) => {
    let list = state.configList.style.find(v => v.id == id);
    list.config_list.push({
      type: "image",
      config: {
        image: "",
        title: "",
        function: null
      }
    });
  },
  DEL_CONFIGITEM: (state, val) => {
    let list = state.configList.style.find(v => v.id == val.active);
    list.config_list.splice(val.index, 1);
  },
  SET_CATEGORYLIST: (state, val) => {
    state.categoryList = val;
  },
  SET_active:(state, val)=>{
    state.active = val;
    }
};

const getters = {
  getStyleList: state => {
    // console.log(state.tabbar,"犬瘟热平均每天")
    return state.tabbar;
  },
  getPageDetail: state => {
    return state.tabbar.config_list;
  },
  getLimit: state => {
    return {
      min: state.tabbar.min,
      max: state.tabbar.max
    };
  },
  getBusiness: state => {
    return state.tabbar.config_list[state.activeTabbar].config.business_id;
  },
  getAppPage: state => {
    return state.tabbar.config_list[state.activeTabbar].pages;
  }
};

const actions = {
  getDecorationDetail(store, id) {
    api.getDecorationDetail({ id }).then(res => {
      if (res.length) {
        store.commit("SET_TABBAR", res);
      } else {
        store.commit("SET_TABBAR", [
          {
            type: "tabbar",
            config: {
              active_icon: "",
              unactive_icon: "",
              business_id: 1
            },
            pages: {
              head: [],
              body: []
            }
          },
          {
            type: "tabbar",
            config: {
              active_icon: "",
              unactive_icon: "",
              business_id: 1
            },
            pages: {
              head: [],
              body: []
            }
          },
          {
            type: "tabbar",
            config: {
              active_icon: "",
              unactive_icon: "",
              business_id: 1
            },
            pages: {
              head: [],
              body: []
            }
          },
          {
            type: "tabbar",
            config: {
              active_icon: "",
              unactive_icon: "",
              business_id: 1
            },
            pages: {
              head: [],
              body: []
            }
          },
          {
            type: "tabbar",
            config: {
              active_icon: "",
              unactive_icon: "",
              business_id: 0
            },
            pages: "me"
          }
        ]);
      }
    });
  },
  //通过接口获取左边基本、功能组件列表
  getComponentList(store) {
    api.getComponentList({ business_id: 1 }).then(res => {
      res.basic.forEach(v1 => {
        v1.style.forEach(v2 => {
          v2 = Object.assign(v2, configlist[v1.id][v2.id]);
        });
      });

      res.function.forEach(v1 => {
        v1.style.forEach(v2 => {
          v2 = Object.assign(v2, configlist[v1.id][v2.id]);
        });
      });

      store.commit("SET_COMPONENTLIST", res);
    });
  },
  // //获取多用户商城
  // getComponentList_user(store) {
  //   api.getComponentList({ business_id: 3 }).then(res => {
  //     res.basic.forEach(v1 => {
  //       v1.style.forEach(v2 => {
  //         v2 = Object.assign(v2, userconfiglist[v1.id][v2.id]);
  //       });
  //     });
  //     store.commit("SET_basicList_userGower", res);
  //
  //   });
  // },
  //点击左边获取某一个选项
  getConfigList(store, v) {
    v && store.commit("SET_CONFIGLIST", v);
  },
  //点击修改
  updateConfig(store, v) {
   store.commit("resetting", JSON.stringify(configlist[v.item.parent_id][v.item.id]["config_list"]))

    let list =
      v.item.parent_component_type == "basic"
        ? store.state.basicList
        : store.state.funcList;

    let newlist = JSON.parse(
      JSON.stringify(list.find(val => val.id == v.item.parent_id))
    );
    newlist.edit_params = v;
    newlist.active_style = v.item.id;
    // console.log(newlist,"修改")
    let index;
    newlist.style.find((val, i) => {
      if (val.id == v.item.id) {
        index = i;
        return true;
      } else {
        return false;
      }
    });
    newlist.style[index].config_list = JSON.parse(
      JSON.stringify(v.item.config_list)
    );
    if(v.item.parent_title_english=="ClassificationList"){
      // console.log("wq")
      var arry_mos = [];
      var svowt = v.item.config_list[0].config.data;
      if(svowt.length>0){
        for (let item of svowt) {
          arry_mos.push(item.id)
        }
      }
      newlist.style[index].config_list[0].config.data = arry_mos
    }
    store.commit("UPDATE_CONFIGLIST", newlist);
  },
  getCategoryList(store) {
    api.getCatgoryList({ category: "taobao" }).then(res => {
      if (res) {
        let val = res.map(v => {
          return {
            id: v.tk_category_id,
            name: v.name,
            icon: v.icon
          };
        });
        store.commit("SET_CATEGORYLIST", val);
      }
    });
  }
};

export default {
  namespaced: true,
  namespace: "decoration",
  state,
  mutations,
  actions,
  getters
};
