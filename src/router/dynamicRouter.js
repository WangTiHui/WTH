/**概况 */
const survey = () => import("@/views/datamange/survey");
// 关于我
const about = () => import("@/views/wang/about/about");
const synopsis = () => import("@/views/wang/about/synopsis");
const culture = () => import("@/views/wang/about/culture");
const odds = () => import("@/views/wang/about/odds");
const course = () => import("@/views/wang/about/course");
// 生活
const life = () => import("@/views/wang/life/life");
const game = () => import("@/views/wang/life/game");
const sport = () => import("@/views/wang/life/sport");
const food = () => import("@/views/wang/life/food");
const cinema = () => import("@/views/wang/life/cinema");
const shop = () => import("@/views/wang/life/shop");
const leisure = () => import("@/views/wang/life/leisure");
// 爱好
const hobby = () => import("@/views/wang/hobby/index");
const video = () => import("@/views/wang/hobby/video");
const picture = () => import("@/views/wang/hobby/picture");
const works = () => import("@/views/wang/hobby/works");
const article = () => import("@/views/wang/hobby/article");
const novel = () => import("@/views/wang/hobby/novel");
// 资历
const seniority = () => import("@/views/wang/seniority/index");
const business = () => import("@/views/wang/seniority/business");
const sskill = () => import("@/views/wang/seniority/skill");
// 技能
const skill = () => import("@/views/wang/skill/skill");
const html = () => import("@/views/wang/skill/html");
const react = () => import("@/views/wang/skill/react");
const taro = () => import("@/views/wang/skill/taro");
const vue = () => import("@/views/wang/skill/vue");
const applets = () => import("@/views/wang/skill/applets");
//公共view
const RouterContainer = () => import("@/views/RouterContainer");
const dynamicRouter = [
  {
    path: "/survey",
    name: "survey",
    component: RouterContainer,
    meta: {
      name: "survey",
      icon: "el-icon-s-opportunity",
      hidden:false,
    },
    children: [
      {
        path: "surveyList",
        name: "surveyList",
        component: survey,
        meta: {
          name: "surveyList",
          hidden:false,
        }
      },
    ]
  },
  {
    path: "/about",
    name: "about",
    component: RouterContainer,
    meta: {
      name: "about",
      hidden:false,
    },
    children: [
      {
        path: "about",
        name: "about",
        component: about,
        meta: {
          name: "about",
          hidden:false,
        }
      },
      {
        path: "synopsis",
        name: "synopsis",
        component: synopsis,
        meta: {
          name: "synopsis",
          hidden:false,
        }
      },
      {
        path: "culture",
        name: "culture",
        component: culture,
        meta: {
          name: "culture",
          hidden:false,
        }
      },
      {
        path: "odds",
        name: "odds",
        component: odds,
        meta: {
          name: "odds",
          hidden:false,
        }
      },
      {
        path: "course",
        name: "course",
        component: course,
        meta: {
          name: "course",
          hidden:false,
        }
      },
    ]
  },
  {
    path: "/life",
    name: "life",
    component: life,
    meta: {
      name: "life",
      hidden:false,
    },
    children: [
      {
        path: "game",
        name: "game",
        component: game,
        meta: {
          name: "game",
          hidden:false,
        }
      },
      {
        path: "sport",
        name: "sport",
        component: sport,
        meta: {
          name: "sport",
          hidden:false,
        }
      },
      {
        path: "food",
        name: "food",
        component: food,
        meta: {
          name: "food",
          hidden:false,
        }
      },
      {
        path: "cinema",
        name: "cinema",
        component: cinema,
        meta: {
          name: "cinema",
          hidden:false,
        }
      },
      {
        path: "shop",
        name: "shop",
        component: shop,
        meta: {
          name: "shop",
          hidden:false,
        }
      },
      {
        path: "leisure",
        name: "leisure",
        component: leisure,
        meta: {
          name: "leisure",
          hidden:false,
        }
      },
    ]
  },
  {
    path: "/hobby",
    name: "hobby",
    component: RouterContainer,
    meta: {
      name: "hobby",
      hidden:false,
    },
    children:[
      {
        path: "video",
        name: "video",
        component: video,
        meta: {
          name: "video",
          hidden:false,
        }
      },
      {
        path: "picture",
        name: "picture",
        component: picture,
        meta: {
          name: "picture",
          hidden:false,
        }
      },
      {
        path: "article",
        name: "article",
        component: article,
        meta: {
          name: "article",
          hidden:false,
        }
      },
      {
        path: "works",
        name: "works",
        component: works,
        meta: {
          name: "works",
          hidden:false,
        }
      },
      {
        path: "novel",
        name: "novel",
        component: novel,
        meta: {
          name: "novel",
          hidden:false,
        }
      },
    ]
  },
  {
    path: "/seniority",
    name: "seniority",
    component: seniority,
    meta: {
      name: "seniority",
      hidden:false,
    },
    children:[
      {
        path: "business",
        name: "business",
        component: business,
        meta: {
          name: "business",
          hidden:false,
        }
      },
      {
        path: "sskill",
        name: "sskill",
        component: sskill,
        meta: {
          name: "sskill",
          hidden:false,
        }
      },
    ]
  },
  {
    path: "/skill",
    name: "skill",
    component: skill,
    meta: {
      name: "skill",
      hidden:false,
    },
    children: [
      {
        path: "html",
        name: "html",
        component: html,
        meta: {
          name: "html",
          hidden:false,
        }
      },
      {
        path: "taro",
        name: "taro",
        component: taro,
        meta: {
          name: "taro",
          hidden:false,
        }
      },
      {
        path: "react",
        name: "react",
        component: react,
        meta: {
          name: "react",
          hidden:false,
        }
      },
      {
        path: "vue",
        name: "vue",
        component: vue,
        meta: {
          name: "vue",
          hidden:false,
        }
      },
      {
        path: "applets",
        name: "applets",
        component: applets,
        meta: {
          name: "applets",
          hidden:false,
        }
      },
    ]
  },
];

export default dynamicRouter;
