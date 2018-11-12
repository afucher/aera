import CourseService from '../services/CourseService'
import GroupService from '../services/GroupService'
import ClientService from '../services/ClientService'
import TeacherService from '../services/TeacherService'
import Auth from '../services/AuthService'
import * as mut_types from './mutation-types';
const course_srv = new CourseService();
const group_srv = new GroupService();
const client_srv = new ClientService();
const teacherSrv = new TeacherService();

export default {
        createCourse: ( {commit} , payload ) => {
                return new Promise((resolve,reject) => {
                        course_srv.createCourse(payload)
                        .then(resolve)
                        .catch(({data})=>reject(data.message));
                })
                
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
        updateCourse: ( {commit} , payload ) => {
                let course = payload;
                return new Promise((resolve,reject) => {
                        course_srv.updateCourse(course)
                        .then(resolve)
                        .catch(({data})=>reject(data.message));
                })      
        },
        createGroup: ( {commit} , payload ) => {
                let group = payload;
                return new Promise((resolve,reject) => {
                        group_srv.createGroup(group)
                        .then(g => {
                                commit(mut_types.CREATE_GROUP, g),
                                resolve(g);
                        })
                        .catch(({data})=>reject(data.message));
                })
        },
        updateGroup: ( {commit} , payload ) => {
                let group = payload;
                return new Promise((resolve,reject) => {
                        group_srv.updateGroup(group)
                        .then(g => {
                                //commit(mut_types.CREATE_GROUP, g),
                                resolve(g);
                        })
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
        },
        unenrollStudent: ({commit}, payload) => {
                let student = payload.student;
                let student_id = student.id;
                let group = payload.group;
                return group_srv.unenrollStudent({group, student_id});
        },
        createClient: ( {commit} , payload ) => {
                return new Promise((resolve,reject) => {
                        client_srv.createClient(payload)
                                .then(resolve)
                                .catch(reject);
                })
        },
        updateClient: ( {commit} , payload ) => {
                return new Promise((resolve,reject) => {
                        client_srv.updateClient(payload)
                                .then(resolve)
                                .catch(reject);
                })
        },
        login: ( {commit}, {username, password} ) => {
                return new Promise((resolve, reject) => {
                        Auth.login(username, password)
                               .then( user => {
                                        resolve(commit(mut_types.LOGIN, user));
                                })
                                .catch(()=> reject(commit(mut_types.LOGOUT) ) )
                })
 
                        
        },
        logout: ({commit}) => commit(mut_types.LOGOUT),
        setClient: ({commit},client) => commit(mut_types.SET_CLIENT, client),
        toogleTeacher: ({commit}, {id, teacher}) => {
                return teacher ?
                                 teacherSrv.setTeacher(id).then(commit(mut_types.SET_TEACHER,id))
                                 : teacherSrv.unsetTeacher(id).then(commit(mut_types.UNSET_TEACHER,id));
        },
        loadTeachers: ({commit}) => {
                teacherSrv.getAll()
                        .then(t => t.json())
                        .then(t => commit(mut_types.LOAD_TEACHERS,t.data));
        },
        setStudentAttendance: ({commit},{group_id,student_id,attendance}) => {
                return group_srv.updateAttendance({group_id, student_id, attendance});
        },
        createInstallments: ({commit},{group_id,payment}) => {
                return group_srv.createInstallments({group_id, payment});
        }

}