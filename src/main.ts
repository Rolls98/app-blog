import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Default from "@/layouts/Default.vue";
import Paginate from "vuejs-paginate";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading);

Vue.component("loading", Loading);

import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

Vue.use(VuePlyr, {
  plyr: {},
});

Vue.component("paginate", Paginate);
Vue.component("Default", Default);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
