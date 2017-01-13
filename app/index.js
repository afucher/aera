import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'
import store from './vuex/store'

import App from './components/App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const router = new VueRouter({
  routes: [
    {path: '/courses', name:'courses', component: require('./components/course/Courses.vue')},
    {path: '/courses/:id/newGroup', name:'newGroup', component: require('./components/group/NewGroup.vue')},
    {path: '/groups', name:'groups', component: require('./components/group/ListGroup.vue')}
  ],
  linkActiveClass: 'active'
});

new Vue({
  el : '#app',
  router,
  store,
  render : (h) => h(App)

});