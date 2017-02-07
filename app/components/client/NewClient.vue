<template>
    <form @submit.prevent="createClient">
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
    <button type="submit" class="btn btn-default">Criar</button>
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
