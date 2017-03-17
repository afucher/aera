import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

import MyErrMsg from './components/util/ErrorMessage.vue'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('MyErrMsg',MyErrMsg);
Vue.use(ClientTable, {}, false);
Vue.use(ServerTable, {}, false);