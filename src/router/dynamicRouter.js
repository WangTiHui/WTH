/**概况 */
const survey = () => import("@/views/datamange/survey");
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
      }
    ]
  },
];

export default dynamicRouter;
