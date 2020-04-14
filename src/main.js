import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./theme/index.css";
import "./styles/reset.css"
import "./styles/animation.css"
import "./styles/style.css"
import Echarts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/polar";
import less from 'less';
import '@/icons' // icon
Vue.use(less)
Vue.component("v-chart", Echarts);

import axios from "@/api/config/httpConfig.js";
Vue.prototype.$http = axios;

import validator from '@/utils/validator'
Vue.prototype.$validator = validator

//import globelComponent from '@/components/globelComponent' // 集成全局组件注册
//Vue.use(globelComponent)

import * as globalFilter from "@/global/filters";
Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key]);
});
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)
Vue.use(ElementUI, {
  size: 'medium'
});
import rongyun from '@/assets/rongyun/RongIMLib-2.4.0.min.js'//融云
import rongEmoji from '@/assets/rongyun/RongEmoji-2.2.7.js'//表情
Vue.config.productionTip = false

Vue.prototype.rongyun = rongyun
Vue.prototype.rongEmoji= rongEmoji

import areaJson from '@/static/json.json';
Vue.prototype.areaJson = areaJson;

Vue.config.productionTip = false;

router.afterEach((to, from, next) => {
  const routerlist = to.matched;
  store.commit("setCrumbList", routerlist);
});

// 针对[type = number]输入框只能输入数字
Vue.prototype.$keyProhibit = function(event) {
  if (
    event.keyCode === 69 || event.keyCode === 189 || event.keyCode === 190 ||
    event.keyCode === 107 || event.keyCode === 109 || event.keyCode === 110
  ) {
    event.returnValue = false
  }
}

const on = Vue.prototype.$on
 
// 节流
Vue.prototype.$on = function (event, func) {
    let previous = 0
    let newFunc = func
    if (event === 'click') {
        newFunc = function () {
            const now = new Date().getTime()
            if (previous + 2000 <= now) {
                func.apply(this, arguments)
                previous = now
            }
        }
    }
    on.call(this, event, newFunc)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
