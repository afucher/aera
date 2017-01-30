<template>
    <div>
        <div v-for="client in clients">
            <p>{{client.name}}</p>
        </div>
    </div>
</template>
 
<script>
import ClientService from '../../services/ClientService'
    export default {
        name: "AeraListClient",
        data: function(){
            return {
                clients: null,
                service: new ClientService()
            }
        },
        mounted() {
            this.service.getClients().then(c => this.clients = c);
        }
    }
</script>