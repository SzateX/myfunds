import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from "vue-axios";
import { configureAxios } from "@/plugins/axios";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

configureAxios();
Vue.use(VueAxios, axios);


new Vue({
  router,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app');
