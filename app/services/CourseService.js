'use strict';

import Vue from 'vue';

export default class MyService {
    constructor(){
        this.resource = Vue.resource('/courses');
    }
    
    getCourses() {
        return this.resource.get().then((d) => d.json());
    }

    putCourses(){
        return this.resource.put();
    }
}
