'use strict';

import Vue from 'vue';
import axios from 'axios';

const returnData = res => res.data;

export default class MyService {
    constructor(){
        this.resourceAll = axios.create({
            baseURL: '/api/groups',
            timeout: 1000,
          });
    }
    
    getAll() {
        return this.resourceAll.get().then(console.log);
    }

    get(id) {
        return this.resourceAll.get(`/${id}`).then(returnData);
    }

    createGroup(group){
        return this.resourceAll.post(group).then(returnData);
    }

    deleteGroup(group){
        return this.resourceAll.delete(`/${group.id}`).then(returnData);
    }

    updateGroup(group){
        return this.resourceOne.put(`/${group.id}`,group).then(returnData);
    }

    addStudent({group, student_id}) {
        return axios.post(`/api/groups/${group.id}/addStudent`,{student_id})
            .then(returnData);
    }

    unenrollStudent({group, student_id}) {
        return axios.post(`/api/groups/${group.id}/unenroll`,{student_id})
            .then(returnData);
    }
    
    updateAttendance({group_id, student_id, attendance}) {
        return axios.post(`/api/groups/${group_id}/studentAttendance`,{student_id,attendance})
            .then(returnData);
    }

    createInstallments({group_id, payment}) {
        return axios.post(`/api/groups/${group_id}/createInstallments`,payment)
            .then(returnData);
    }

    
}
