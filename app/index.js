import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'
import store from './vuex/store'

import App from './components/App.vue'

const router = new VueRouter({
  routes: [
    {path: '/courses', component: require('./components/course/Courses.vue')}
  ]
});

new Vue({
  el : '#app',
  router,
  store,
  render : (h) => h(App)

});