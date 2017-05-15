<template>
    <form @submit.prevent="formSubmit">
        <div class="form-group">    
            <label>Nome</label>
            <input v-validate="'required'" name="name" type="text" v-model="course.name" class="form-control">
            <span v-show="errors.has('name')" class="bg-danger">{{ errors.first('name') }}</span>
        </div>
        <div class="form-group">    
            <label>Descrição</label>
            <input v-validate="'required'" name="description" type="text" v-model="course.description" class="form-control">
            <span v-show="errors.has('description')" class="bg-danger">{{ errors.first('description') }}</span>
        </div>
        <button type="submit" class="btn btn-default">Salvar</button>
        <button @click.prevent="cancel" class="btn btn-default">Cancelar</button>
    </form>
</template>
<script>
export default {
    props: ['course'],
    data: function(){
        return {
            errorMessage: ''
        }
    },
    methods: {
        formSubmit(){
            this.$validator.validateAll()
                .then(()=>{
                    this.$emit("formSubmit", this.course);
                })
                .catch(()=>{});
        },
        cancel(){
            this.$emit("formCancel");
        }
    }
}
</script>