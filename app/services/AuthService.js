'use strict';

import Vue from 'vue';

export default {
    
    ['login'](username, password) {
        return Vue.http.post('/login', {username,password})
            .then(user => user.json())
    },

    ['logout'](){
        return Vue.http.post('/logout');
    }

}
