import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import actions from './actions'

import * as types from './mutation-types'




export default new Vuex.Store({
    state: {
        message: "Seja bem-vindo",
        courses: [],
        groups: []
    },
    actions,
    mutations: {
        addCourse(state, payload) {
            state.courses.push(payload);
        },
        loadCourses(state, payload) {
            state.courses = payload;
        },
        [types.DELETE_COURSE]({courses}, payload) {
            courses.splice(courses.findIndex((el) => el.id == payload.id), 1);

        },
        [types.SET_GROUPS](state, payload) {
            state.groups = payload;
        },
        [types.CREATE_GROUP](state, payload) {
            state.groups.push(payload);
        },
        [types.ADD_STUDENT]({groups}, {group,student}) {
            const grp_idx = groups.findIndex(el => el.id == group.id);
            if (groups[grp_idx].Students.findIndex(el => el.id == student.id) < 0)
                groups[grp_idx].Students.push(student);
        }
    },
    getters: {
        groupsFromCourse: (state) => course_id => {
            return state.groups.filter(group => group.course_id == course_id);
        },
        group: (state) => group_id => {
            return state.groups.filter(group => group.id == group_id)[0];
        }
    }
})