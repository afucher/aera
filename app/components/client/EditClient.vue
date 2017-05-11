<template>
    <div>
        <BtnMakeTeacher v-if="!client.teacher" :id="client.id"></BtnMakeTeacher>
        <BtnUnsetTeacher v-if="client.teacher" :id="client.id"></BtnUnsetTeacher>
        <ClientForm :client="client" v-on:formSubmit="updateClient" v-on:formCancel="cancel"></ClientForm>
        <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
    </div>
</template>

<script>
import ClientService from '../../services/ClientService'
import BtnMakeTeacher from '../teacher/BtnMakeTeacher.vue'
import BtnUnsetTeacher from '../teacher/BtnUnsetTeacher.vue'
import ClientForm from './ClientForm.vue'
const cliSrv = new ClientService();
export default {
    components: {BtnMakeTeacher,BtnUnsetTeacher,ClientForm},
    data: function(){
        return {
            client: {},
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
            this.$store.dispatch('updateClient', this.client)
                .then(() => this.$router.push('/clients'))
                .catch((err) => this.errorMessage = err.body.message);
        },
        cancel() {
            this.$router.go(-1);
        }
    }
}
</script>
