export function setDefaultRoute(routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name };
      setDefaultRoute(v.children);
    }
  });
}

export function mergeRouter(defaultRouter, dynamicRouter) {
  let layout = defaultRouter.find(v => v.name === "layout");
  layout.children = dynamicRouter;
  setDefaultRoute(defaultRouter);
}
