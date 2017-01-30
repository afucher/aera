'use strict';

import Vue from 'vue';

export default class ClientService {
    constructor(){
        this.resourceAll = Vue.resource('/api/clients');
        this.resourceOne = Vue.resource('/api/client{/id}');
    }
    
    getClients() {
        return this.resourceAll.get().then((c) => c.json());
    }

    createClient(client){
        return this.resourceAll.save(client).then((c) => c.json());
    }

}
