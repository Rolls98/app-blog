import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Default from "@/layouts/Default.vue";
import VueVideoPlayer from "vue-video-player";
import Paginate from "vuejs-paginate";
import "video.js/dist/video-js.css";

import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

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
