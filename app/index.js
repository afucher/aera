import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'
import store from './vuex/store'

import App from './components/App.vue'
import ElementUI from 'element-ui'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)


const router = new VueRouter({
  routes: [
    {
      path: '/courses', name: 'courses', component: require('./components/course/Courses.vue'),
      children: [{
        name: 'courseGroups',
        path: ':id/groups',
        component: require('./components/group/CourseGroups.vue')
      }]
    },
    { path: '/courses/:id/newGroup', name: 'newGroup', component: require('./components/group/NewGroup.vue') },
    { path: '/groups', name: 'groups', component: require('./components/group/ListGroup.vue')},
    { path: '/groups/:id', name: 'group', component: require('./components/group/Group.vue')},
    { path: '/groups/:id/edit', name: 'groupEdit', component: require('./components/group/GroupEdit.vue')},
    { path: '/clients', name: 'clients', component: require('./components/client/ListClient.vue')},
  ],
  linkActiveClass: 'active'
});

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)

});