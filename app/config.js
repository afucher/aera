import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

import MyErrMsg from './components/util/ErrorMessage.vue'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('MyErrMsg',MyErrMsg);