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
    { path: '/groups/:id/list', name: 'groupList', component: require('./components/group/GetGroupList.vue'), props:{id:1}},
    { path: '/clients', name: 'clients', component: require('./components/client/ListClient.vue')},
    { path: '/clients/:id/edit', name: 'editClient', component: require('./components/client/EditClient.vue')},
    { path: '/clients/new', name: 'newClient', component: require('./components/client/NewClient.vue')},
    { path: '/login', name: 'login', component: require('./components/auth/Login.vue')},
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && !store.state.user){
    next('/login');
  }else{
    next();
  }
})

Vue.http.interceptors.push(function(request, next) {
  // continue to next interceptor
  next(function(response) {
      if(response.status == 401){
          router.push('\login');
      }
  });
});

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)

});