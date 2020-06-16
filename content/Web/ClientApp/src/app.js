import Vue from "vue";
import axios from "axios";
import router from "./router/index";
import store from "./store";
import { sync } from "vuex-router-sync";
import App from "./components/app.vue";
import { FontAwesomeIcon } from './icons/index';

Vue.component('icon', FontAwesomeIcon);

Vue.prototype.$http = axios;
global.$ = global.jQuery = require('jquery');
sync(store, router);

const app = new Vue({
  store,
  router,
  ...App
});

export {
  app,
  router,
  store
};
