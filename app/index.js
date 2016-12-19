import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App.vue'

Vue.use(VueRouter)

const router = new VueRouter({});

new Vue({
  el : '#app',
  router,
  render : (h) => h(App)

})

/*
Vue.use(VueResource)


export var router = new VueRouter()*/

// Redirect to the home route if any routes are unmatched
/*router.redirect({
  '*': '/home'
})*/


// Start the app on the #app div
//router.start(App, '#app')