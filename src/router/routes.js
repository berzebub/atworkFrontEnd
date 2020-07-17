const routes = [
  {
    path: "/",
    component: () => import("pages/login.vue"),
    name: "login"
  },
  {
    path: "/forgetpassword",
    component: () => import("pages/forgetpassword.vue"),
    name: "forgetpassword"
  },
  {
    path: "/practicemain",
    component: () => import("pages/practicemain.vue"),
    name: "practicemain"
  },
  {
    path: "/refervocab",
    component: () => import("pages/refervocab.vue"),
    name: "refervocab"
  },
  {
    path: "/refersentence",
    component: () => import("pages/refersentence.vue"),
    name: "refersentence"
  },
  {
    path: "/referconversation",
    component: () => import("pages/referconversation.vue"),
    name: "referconversation"
  },
  {
    path: "/setting",
    component: () => import("pages/setting.vue"),
    name: "setting"
  },

  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "/test", component: () => import("pages/Index.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
