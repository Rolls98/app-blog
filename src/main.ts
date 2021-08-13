import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Default from "@/layouts/Default.vue";
import VueVideoPlayer from "vue-video-player";
import Paginate from "vuejs-paginate";
import "video.js/dist/video-js.css";

// require videojs style

Vue.component("paginate", Paginate);
Vue.component("Default", Default);

Vue.use(
  VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */,
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
