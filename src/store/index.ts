import Vue from "vue";
import websiteModule from "./websiteModule";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    websiteModule: websiteModule,
  },
  // state: {
  //   contactModal: false,
  //   loading: false,
  //   favoritesModal: false,
  // },
});
