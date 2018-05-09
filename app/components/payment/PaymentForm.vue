<template>
    <form @submit.prevent="formSubmit">
        <div class="form-group">    
            <label>Número de parcelas</label>
            <input v-validate="'required'" name="installments" type="number" v-model="payment.installments" class="form-control">
            <span v-show="errors.has('installments')" class="bg-danger">{{ errors.first('installments') }}</span>
        </div>
        <div class="form-group">    
            <label>Valor</label>
            <input v-validate="'required'" name="value" type="number" v-model="payment.value" class="form-control">
            <span v-show="errors.has('value')" class="bg-danger">{{ errors.first('value') }}</span>
        </div>
        <div class="form-group">
            <label>Vencimento</label>
            <input name="due_date" type="text" v-model="payment.due_date"
                v-validate="{ required:true }"
                required>
            <span v-show="errors.has('due_date')" class="bg-danger">{{ errors.first('due_date') }}</span>
        </div>
        <button type="submit" class="btn btn-default">Salvar</button>
        <button @click.prevent="cancel" class="btn btn-default">Cancelar</button>
    </form>
</template>
<script>
export default {
    props: ['payment'],
    data: function(){
        return {
            errorMessage: ''
        }
    },
    methods: {
        formSubmit(){
            this.$validator.validateAll();
            if(this.errors.any()) return;
            this.$emit("formSubmit", this.payment);
        },
        cancel(){
            this.$emit("formCancel");
        }
    }
}
</script>