import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import actions from './actions'




export default new Vuex.Store({
    state : {
        message : "Seja bem-vindo",
        courses: []
    },
    actions,
    mutations: {
        addCourse (state, payload) {
            state.courses.push(payload);
        }
    }
})