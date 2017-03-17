'use strict';

import Vue from 'vue';

export default class ClientService {
    constructor(){
        this.resourceAll = Vue.resource('/api/clients');
        this.resourceOne = Vue.resource('/api/clients{/id}');
    }
    
    getClients() {
        return this.resourceAll.get().then((c) => c.json());
    }

    getClient( id ) {
        return this.resourceOne.get({id}).then(c => c.json());
    }

    createClient(client){
        return this.resourceAll.save(client).then((c) => c.json());
    }
    
    updateClient(client){
        return this.resourceOne.update({id:client.id},{client}).then(c => c.json());
    }

}
