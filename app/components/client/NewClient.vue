<template>
    <form @submit.prevent="createClient">
    <div class="form-group">
        <label>Nome</label>
        <input v-validate="'required'" name="name" type="text" v-model="client.name" class="form-control">
        <span v-show="errors.has('name')" class="bg-danger">{{ errors.first('name') }}</span>
    </div>
    <div class="form-group">
        <label>CPF</label>
        <input type="text" v-model="client.cpf" class="form-control">
    </div>
    <div class="form-group">
        <label>E-mail</label>
        <input name="email" v-validate="'email'" type="text" v-model="client.email" class="form-control">
        <span v-show="errors.has('email')" class="bg-danger">{{ errors.first('email') }}</span>
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
                cpf: '',
                phone:'',
                address:''
            },
            errorMessage: ''
        }
    },
    methods: {
        createClient(e) {
            const that = this;
            this.$validator.validateAll();
            if(this.errors.any()) return;
            that.$store.dispatch('createClient', this.client)
                .then(() => that.$router.push('/clients'))
                .catch((err) => this.errorMessage = err.body.message);
        }
    }
}
</script>
