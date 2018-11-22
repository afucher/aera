import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

import MyErrMsg from './components/util/ErrorMessage.vue'
import { ServerTable, ClientTable, Event } from 'vue-tables-2';

import VeeValidate from 'vee-validate';
import cpf from 'gerador-validador-cpf';
import { Validator } from 'vee-validate';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VeeValidate);

Vue.component('MyErrMsg', MyErrMsg);
Vue.use(ClientTable, {}, false, "bootstrap4");
Vue.use(ServerTable, {}, false, "bootstrap4");

Validator.extend('cpf', {
    getMessage: (field) => `CPF Inválido`,
    validate: (value) => cpf.validate(value)
});