<template>
    <div>
        <BtnMakeTeacher v-if="!client.teacher" :id="client.id"></BtnMakeTeacher>
        <BtnUnsetTeacher v-if="client.teacher" :id="client.id"></BtnUnsetTeacher>
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
    </div>
</template>

<script>
import ClientService from '../../services/ClientService'
import BtnMakeTeacher from '../teacher/BtnMakeTeacher.vue'
import BtnUnsetTeacher from '../teacher/BtnUnsetTeacher.vue'
const cliSrv = new ClientService();
export default {
    components: {BtnMakeTeacher,BtnUnsetTeacher},
    data: function(){
        return {
            client: {
                name: '',
                email: '',
                cpf: '',
                phone:'',
                address:'',
                teacher: false
            },
            errorMessage: ''
        }
    },
    mounted() {
        cliSrv.getClient(this.$route.params.id).then(c => {
            this.client = c;
            this.$store.dispatch('setClient', c);
        });
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
