import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: '/courses', component: require('./components/course/Courses.vue')}
  ]
});

new Vue({
  el : '#app',
  router,
  render : (h) => h(App)

});