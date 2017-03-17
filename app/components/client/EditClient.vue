<template>
    <form @submit.prevent="updateClient">
    <div class="form-group">
        <label>Nome</label>
        <input type="text" v-model="client.name" class="form-control">
    </div>
    <div class="form-group">
        <label>CPF</label>
        <input type="text" v-model="client.cpf" class="form-control">
    </div>
    <div class="form-group">
        <label>E-mail</label>
        <input type="text" v-model="client.email" class="form-control">
    </div>
    <div class="form-group">
        <label>Endereço</label>
        <input type="text" v-model="client.address" class="form-control">
    </div>
    <div class="form-group">
        <label>Telefone</label>
        <input type="text" v-model="client.phone" class="form-control">
    </div>
    <button type="submit" class="btn btn-default">Salvar</button>
    <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
    </form>
</template>

<script>
import ClientService from '../../services/ClientService'
const cliSrv = new ClientService();
export default {
    data: function(){
        return {
            client: {
                name: '',
                email: '',
                cpf: '',
                phone:'',
                address:''
            },
            errorMessage: ''
        }
    },
    mounted() {
        cliSrv.getClient(this.$route.params.id).then(c => this.client = c);
    },
    methods: {
        updateClient(e) {
            const that = this;
            that.$store.dispatch('updateClient', this.client)
                .then(() => that.$router.push('/clients'))
                .catch((err) => this.errorMessage = err.body.message);
        }
    }
}
</script>
