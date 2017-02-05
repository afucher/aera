<template>
    <form @submit.prevent="createClient">
    <div class="form-group">
        <label>Nome</label>
        <input type="text" v-model="client.name">
    </div>
    <div class="form-group">
        <label>CPF</label>
        <input type="text" v-model="client.cpf">
    </div>
    <div class="form-group">
        <label>E-mail</label>
        <input type="text" v-model="client.email">
    </div>
    <button type="submit">Criar</button>
    <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
    </form>
</template>

<script>
export default {
    data: function(){
        return {
            client: {
                name: '',
                email: '',
                cpf: ''
            },
            errorMessage: ''
        }
    },
    methods: {
        createClient(e) {
            this.$store.dispatch('createClient', this.client)
                .then((a)=>console.log(a))
                .catch((err) => this.errorMessage = err);
        }
    }
}
</script>
