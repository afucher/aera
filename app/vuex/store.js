import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import actions from './actions'

import * as types from './mutation-types'




export default new Vuex.Store({
    state : {
        message : "Seja bem-vindo",
        courses: [],
        groups : []
    },
    actions,
    mutations: {
        addCourse (state, payload) {
            state.courses.push(payload);
        },
        loadCourses (state, payload) {
            state.courses = payload;
        },
        [types.DELETE_COURSE] ({courses}, payload) {
            courses.splice(courses.findIndex((el)=> el.id == payload.id), 1);
            
        },
        [types.SET_GROUPS] (state, payload) {
            state.groups = payload;
        }
    }
})