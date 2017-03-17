import CourseService from '../services/CourseService'
import GroupService from '../services/GroupService'
import ClientService from '../services/ClientService'
import Auth from '../services/AuthService'
import * as mut_types from './mutation-types';
const course_srv = new CourseService();
const group_srv = new GroupService();
const client_srv = new ClientService();

export default {
        createCourse: ( {commit} , payload ) => {
                course_srv.createCourse(payload)
                .then((c) => commit(mut_types.CREATE_COURSE, c))
                
        },
        loadCourses: ( {commit, state} ) => {
                course_srv.getCourses()
                .then((courses) => commit('loadCourses', courses))
        },
        delCourse: ( {commit}, payload ) => {
                commit(mut_types.DELETE_COURSE, payload)
                course_srv.deleteCourse(payload)
                        .then((a)=>console.log(a))
                        .catch((err)=>commit(mut_types.CREATE_COURSE, payload))
        },
        createGroup: ( {commit} , payload ) => {
                let group = payload;
                if(group.start_hour.length == 5)
                        group.start_hour += ":00"
                if(group.end_hour.length == 5)
                        group.end_hour += ":00"
                return new Promise((resolve,reject) => {
                        group_srv.createGroup(group)
                        .then((c) => commit(mut_types.CREATE_GROUP, c))
                        .catch(({data})=>reject(data.message));
                })
                
                
        },
        loadGroups: ( {commit, state} ) => {
                group_srv.getAll()
                .then((groups) => commit(mut_types.SET_GROUPS, groups))
        },
        delGroup: ( {commit}, payload ) => {
                commit(mut_types.DELETE_COURSE, payload)
                group_srv.deleteCourse(payload)
        },
        addStudentToGroup: ({commit}, payload) => {
                let student = payload.student;
                let student_id = student.id;
                let group = payload.group;
                return group_srv.addStudent({group, student_id});
                //commit(mut_types.ADD_STUDENT, {group,student});
        },
        createClient: ( {commit} , payload ) => {
                return new Promise((resolve,reject) => {
                        client_srv.createClient(payload)
                                .then(resolve)
                                .catch(reject);
                })
                
                
        },
        login: ( {commit}, {username, password} ) => {
                Auth.login(username, password)
                        .then( user => {
                                commit(mut_types.LOGIN, user)
                        })
                        .catch(()=> commit(mut_types.LOGOUT) )
                        
        },
        logout: ({commit}) => commit(mut_types.LOGOUT)

}