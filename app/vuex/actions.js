import CourseService from '../services/CourseService'
import GroupService from '../services/GroupService'
import * as mut_types from './mutation-types';
const course_srv = new CourseService();
const group_srv = new GroupService();

export default {
        createCourse: ( {commit} , payload ) => {
                course_srv.createCourse(payload)
                .then((c) => commit(mut_types.CREATE_COURSE, c))
                
        },
        loadCourses: ( {commit, state} ) => {
                if (state.courses.length == 0){
                        course_srv.getCourses()
                        .then((courses) => commit('loadCourses', courses))
                }
        },
        delCourse: ( {commit}, payload ) => {
                commit(mut_types.DELETE_COURSE, payload)
                course_srv.deleteCourse(payload)
        },
        createGroup: ( {commit} , payload ) => {
                if(payload.start_hour.length == 5)
                        payload.start_hour += ":00"
                if(payload.end_hour.length == 5)
                        payload.end_hour += ":00"
                group_srv.createGroup(payload)
                .then((c) => commit(mut_types.CREATE_GROUP, c))
                
        },
        loadGroups: ( {commit, state} ) => {
                if (state.groups.length == 0){
                        group_srv.getAll()
                        .then((groups) => commit(mut_types.SET_GROUPS, groups))
                }
        },
        delGroup: ( {commit}, payload ) => {
                commit(mut_types.DELETE_COURSE, payload)
                group_srv.deleteCourse(payload)
        }

}