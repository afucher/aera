import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'
import store from './vuex/store'

import App from './components/App.vue'
import ElementUI from 'element-ui'
import VModal from 'vue-js-modal'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VModal)
Vue.use(ElementUI)


const router = new VueRouter({
  routes: [
    {
      path: '/courses', name: 'courses', component: require('./components/course/Courses.vue').default,
      children: [{
        name: 'courseGroups',
        path: ':id/groups',
        component: require('./components/group/CourseGroups.vue').default
      }]
    },
    { path: '/courses/:id/newGroup', name: 'newGroup', component: require('./components/group/NewGroup.vue').default },
    { path: '/courses/new', name: 'newCourse', component: require('./components/course/NewCourse.vue').default},
    { path: '/courses/:id/edit', name: 'editCourse', component: require('./components/course/EditCourse.vue').default},    
    { path: '/groups', name: 'groups', component: require('./components/group/ListGroup.vue').default},
    { path: '/groups/:id', name: 'group', component: require('./components/group/Group.vue').default},
    { path: '/groups/:id/edit', name: 'groupEdit', component: require('./components/group/GroupEdit.vue').default},
    { path: '/groups/:id/list', name: 'groupList', component: require('./components/group/GetGroupList.vue').default, props:{id:1}},
    { path: '/clients', name: 'clients', component: require('./components/client/ListClient.vue').default},
    { path: '/clients/:id/edit', name: 'editClient', component: require('./components/client/EditClient.vue').default},
    { path: '/clients/new', name: 'newClient', component: require('./components/client/NewClient.vue').default},
    { path: '/payments', name: 'payments', component: require('./components/payment/ListPayment.vue').default},
    { path: '/login', name: 'login', component: require('@/components/auth/Login.vue').default},
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
          store.dispatch('logout');
      }
  });
});

// new Vue({
//   el: '#app',
//   name: "App",
//   router,
//   store,
//   render: (h) => h(App)

// });

// new Vue({
//   render: h => h(App),
// }).$mount('#app');

const app = new Vue({
  router,
  el: '#app',
  template: '',
  components: { App }
  }).$mount('#app')