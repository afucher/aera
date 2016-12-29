import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import actions from './actions'

import {DELETE_COURSE} from './mutation-types'




export default new Vuex.Store({
    state : {
        message : "Seja bem-vindo",
        courses: []
    },
    actions,
    mutations: {
        addCourse (state, payload) {
            state.courses.push(payload);
        },
        loadCourses (state, payload) {
            state.courses = payload;
        },
        [DELETE_COURSE] ({courses}, payload) {
            courses.splice(courses.findIndex((el)=> el.id == payload.id), 1);
            
        }
    }
})