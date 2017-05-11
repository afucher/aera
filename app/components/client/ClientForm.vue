<template>
    <form @submit.prevent="formSubmit">
        <div class="form-group">    
                <label>Nome</label>
                <input v-validate="'required'" name="name" type="text" v-model="client.name" class="form-control">
                <span v-show="errors.has('name')" class="bg-danger">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group">
                <label>CPF</label>
                <input type="text" v-validate="'cpf'" name="cpf" v-model="client.cpf" class="form-control">
                <span v-show="errors.has('cpf')" class="bg-danger">{{ errors.first('cpf') }}</span>
            </div>
            <div class="form-group">
                <label>E-mail</label>
                <input name="email" v-validate="'email'" type="text" v-model="client.email" class="form-control">
                <span v-show="errors.has('email')" class="bg-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
                <label>CEP</label>
                <input name="zip_code" type="text" v-model="client.zip_code" class="form-control"
                    v-validate="{ rules: { numeric: true, max:8} }">
                <span v-show="errors.has('zip_code')" class="bg-danger">{{ errors.first('zip_code') }}</span>
            </div>
            <div class="form-group">
                <label>Endereço</label>
                <input type="text" v-model="client.address1" class="form-control">
            </div>
            <div class="form-group">
                <label>Endereço2</label>
                <input type="text" v-model="client.address2" class="form-control">
            </div>
            <div class="form-group">
                <label>Endereço3</label>
                <input type="text" v-model="client.address3" class="form-control">
            </div>
            <div class="form-group">
                <label>Telefone</label>
                <input type="text" v-model="client.phone" class="form-control">
            </div>
            <div class="form-group">
                <label>Celular</label>
                <input type="text" v-model="client.cel_phone" class="form-control">
            </div>
            <div class="form-group">
                <label>Tel. Comercial</label>
                <input type="text" v-model="client.com_phone" class="form-control">
            </div>
            <div class="form-group">
                <label>Observação</label>
                <textarea  v-model="client.note" class="form-control"/>
            </div>
        <button type="submit" class="btn btn-default">Salvar</button>
        <button @click.prevent="cancel" class="btn btn-default">Cancelar</button>
    </form>
</template>
<script>
export default {
    props: ['client'],
    data: function(){
        return {
            errorMessage: ''
        }
    },
    methods: {
        formSubmit(){
            this.$validator.validateAll()
                .then(()=>{
                    this.$emit("formSubmit", this.client);
                })
                .catch(()=>{});
        },
        cancel(){
            this.$emit("formCancel");
        }
    }
}
</script>