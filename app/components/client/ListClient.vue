<template>
    <div>
        <router-link :to="{ name: 'newClient'}">Criar novo</router-link>
        <div id="people">
            <v-server-table url="/api/clients" :columns="columns" :options="options"></v-server-table>
        </div>
    </div>
</template>
 
<script>
import ClientService from '../../services/ClientService'
import edit from './editTable.vue'
    export default {
        name: "AeraListClient",
        data: function(){
            return {
                clients: null,
                service: new ClientService(),
                columns: ['name','email', 'edit'],
                options : {
                    templates : {
                        edit
                    }
                }
            }
        },
        mounted() {
            this.service.getClients().then(c => this.clients = c);
        }
    }
</script>