'use strict';

import Vue from 'vue';

export default {
    
    ['login'](username, password) {
        return new Promise((resolve, reject) => {
            Vue.http.post('/login', {username,password})
                .then(user => user.json().then(resolve))
                .catch(err => err.json().then(reject));
        });

    },

    ['logout'](){
        return Vue.http.post('/logout');
    }

}
