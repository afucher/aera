import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'

Vue.use(VueRouter);

const router = new VueRouter({});

new Vue({
  el : '#app',
  router,
  render : (h) => h(App)

});