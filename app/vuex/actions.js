import CourseService from '../services/CourseService'
const myService = new CourseService();

export default {
    createCourse: ( {commit} , payload ) => {
            myService.createCourse(payload)
                .then((c) => commit('addCourse', c))
            
        }
}