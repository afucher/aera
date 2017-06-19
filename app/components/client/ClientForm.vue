<template>
    <form @submit.prevent="formSubmit">
        <div class="row">
            <div class="form-group col-xs-4">    
                <label>Nome</label>
                <input v-validate="'required'" name="name" type="text" v-model="client.name" class="form-control">
                <span v-show="errors.has('name')" class="bg-danger">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group col-xs-4">
                <label>CPF</label>
                <input type="text" v-validate="'cpf'" name="cpf" v-model="client.cpf" class="form-control">
                <span v-show="errors.has('cpf')" class="bg-danger">{{ errors.first('cpf') }}</span>
            </div>
            <div class="form-group col-xs-4">
                <label>E-mail</label>
                <input name="email" v-validate="'email'" type="text" v-model="client.email" class="form-control">
                <span v-show="errors.has('email')" class="bg-danger">{{ errors.first('email') }}</span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-xs-6">
                <label>Endereço</label>
                <input type="text" v-model="client.address1" class="form-control">
            </div>
            <div class="form-group col-xs-6">
                <label>CEP</label>
                <input name="zip_code" type="text" v-model="client.zip_code" class="form-control"
                    v-validate="{ rules: { numeric: true, max:8} }">
                <span v-show="errors.has('zip_code')" class="bg-danger">{{ errors.first('zip_code') }}</span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-xs-4">
                <label>Endereço2</label>
                <input type="text" v-model="client.address2" class="form-control">
            </div>
            <div class="form-group col-xs-4">
                <label>Endereço3</label>
                <input type="text" v-model="client.address3" class="form-control">
            </div>
            <div class="form-group col-xs-2">
                <label>Cidade</label>
                <input type="text" v-model="client.city" class="form-control">
            </div>
            <div class="form-group col-xs-2">
                <label>Estado</label>
                <input type="text" v-model="client.state" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-xs-4">
                <label>Telefone</label>
                <input type="text" v-model="client.phone" class="form-control">
            </div>
            <div class="form-group col-xs-4">
                <label>Celular</label>
                <input type="text" v-model="client.cel_phone" class="form-control">
            </div>
            <div class="form-group col-xs-4">
                <label>Tel. Comercial</label>
                <input type="text" v-model="client.com_phone" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-xs-4">
                <label for="profession">Profissão</label>
                <input class="form-control" type="text" v-model="client.profession">
            </div>
            <div class="form-group col-xs-4">
                <label for="">Grau de Escolaridade</label>
                <select class="form-control" v-model="client.edu_lvl">
                    <option>1G</option>
                    <option>1I</option>
                    <option>2G</option>
                    <option>2I</option>
                    <option>2C</option>
                    <option>3G</option>
                    <option>3I</option>
                    <option>3C</option>
                </select>
                <!--<input class="form-control" type="text" v-model="client.edu_lvl">-->
            </div>
            <div class="form-group col-xs-4">
                <label for="">Código antigo</label>
                <input class="form-control" type="text" v-model="client.old_code">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-xs-4">
                <label for="">Data de nascimento</label>
                <input type="text" class="form-control" v-model="client.birth_date">
            </div>
            <div class="form-group col-xs-4">
                <label for="">Hora</label>
                <input type="text" class="form-control" v-model="client.birth_hour">
            </div>
            <div class="form-group col-xs-4">
                <label for="">Local</label>
                <input type="text" class="form-control" v-model="client.birth_place">
            </div>
        </div>
        <div class="form-group">
            <label>Observação</label>
            <textarea rows="3" v-model="client.note" class="form-control"/>
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox" v-model="client.teacher"/>Professor
            </label>
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