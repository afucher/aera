'use strict';

import Vue from 'vue';

export default class MyService {
    constructor(){
        this.resourceAll = Vue.resource('/api/groups');
        this.resourceOne = Vue.resource('/api/groups{/id}');
    }
    
    getAll() {
        return this.resourceAll.get().then((d) => d.json());
    }

    get(id) {
        return this.resourceOne.get({id}).then(d => d.json());
    }

    createGroup(group){
        return this.resourceAll.save(group).then((g) => g.json());
    }

    deleteGroup(group){
        return this.resourceOne.delete({id:group.id}).then((g)=>g.json());
    }

    updateGroup(group){
        return this.resourceOne.update({id:group.id},group).then(g=>g.json());
    }

    addStudent({group, student_id}) {
        return Vue.http.post(`/api/groups/${group.id}/addStudent`,{student_id})
            .then(st => st.json());
    }

    unenrollStudent({group, student_id}) {
        return Vue.http.post(`/api/groups/${group.id}/unenroll`,{student_id})
            .then(st => st.json());
    }
    
    updateAttendance({group_id, student_id, attendance}) {
        return Vue.http.post(`/api/groups/${group_id}/studentAttendance`,{student_id,attendance})
            .then(st => st.json());
    }

    createInstallments({group_id, payment}) {
        return Vue.http.post(`/api/groups/${group_id}/createInstallments`,payment)
            .then(st => st.json());
    }

    
}
