import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Videos from "@/views/Videos.vue";
import Blog from "@/views/Blog.vue";
import Video from "@/views/Video.vue";
import Article from "@/views/Article.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Articles/:id",
    name: "Article",
    component: Article,
  },
  {
    path: "/Blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/Videos/:id",
    name: "Video",
    component: Video,
  },
  {
    path: "/Videos",
    name: "Videos",
    component: Videos,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
