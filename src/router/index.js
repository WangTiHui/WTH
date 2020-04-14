import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/login/Login";
import LayOut from "@/views/layout";
import Forbidden from "@/views/errorpage/Forbidden";
import NotFound from "@/views/errorpage/NotFound";
import { mergeRouter } from "./routerutils";
import store from "@/store/index.js";
import dynamicRouter from "./dynamicRouter";

// 解决 NavigationDuplicated 错误
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

let defaultRouter = [
  {
    path: "/index",
    name: "index",
    component: Login
  }
  // {
  //   path: "/",
  //   name: "layout",
  //   component: LayOut
  // }
];

const primaryRouter = [
  {
    path: "/",
    name: "layout",
    component: LayOut,
    meta: {
      name: "首页"
    }
  },
  {
    path: "/403",
    name: "403",
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

defaultRouter = defaultRouter.concat(primaryRouter);
mergeRouter(defaultRouter, dynamicRouter);
//console.log(defaultRouter);
var router = new Router({
  routes: defaultRouter
});
// router.beforeEach((to, from, next) => {
//   if (to.name!="login") {
//     if (localStorage.token_gwt) {
//       store.dispatch("login");
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
//router.onError((callback)=>{
//  console.log(callback)
//});
router.onError((error) => {
	  location.reload();
	  console.log(error)
	  console.log('路由错误')
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    if(isChunkLoadFailed){
        location.reload();
    }
    
});
export default router
