<template>
    <modal name="hello-world">
        <form @submit.prevent="formSubmit">
        <div class="form-group">
            <label>Número de parcelas</label>
            <input type="number" v-model="payment.start_date"/>
        </div>
        <div class="form-group">
            <label>Valor</label>
            <input type="number" v-model="payment.start_date"/>
        </div>
        <div class="form-group">
            <label>Data de vencimento</label>
            <input type="text" v-model="payment.end_date"/>
        </div>
        <div  v-if="errorMessage" class="alert alert-danger alert-dismissible" role="alert">
            <span>{{errorMessage}}</span>
        </div>
        <button type="submit" class="btn btn-default">Salvar</button>
        <button @click.prevent="hide" class="btn btn-default">Cancelar</button>
    </form>

    </modal>
</template>

<script>
export default {
    name:"ModalPayment",
    data: function() {
        return {
            payment: {}
        }
    },
    methods: {
        show () {
            this.$modal.show('hello-world');
        },
        hide () {
            this.$modal.hide('hello-world');
        }
    }
}
</script>