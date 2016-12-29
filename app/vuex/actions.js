import CourseService from '../services/CourseService'
import { CREATE_COURSE, DELETE_COURSE } from './mutation-types'
const myService = new CourseService();

export default {
        createCourse: ( {commit} , payload ) => {
                myService.createCourse(payload)
                .then((c) => commit(CREATE_COURSE, c))
                
        },
        loadCourses: ( {commit, state} ) => {
                if (state.courses.length == 0){
                        myService.getCourses()
                        .then((courses) => commit('loadCourses', courses))
                }
        },
        delCourse: ( {commit}, payload ) => {
                commit(DELETE_COURSE, payload)
                myService.deleteCourse(payload)
        }

}