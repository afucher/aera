<template>
    <div>
        <ClientForm :client="client" v-on:formSubmit="createClient"></ClientForm>
        <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
    </div>
</template>

<script>
import ClientForm from './ClientForm.vue'
export default {
    components: {ClientForm},
    data: function(){
        return {
            client: {},
            errorMessage: ''
        }
    },
    methods: {
        createClient(e) {
            this.$store.dispatch('createClient', e)
                .then(() => this.$router.push('/clients'))
                .catch((err) => {
                    this.errorMessage = err.body.message
                });
        }
    }
}
</script>
