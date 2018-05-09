<template>
    <modal name="hello-world">
        <PaymentForm :payment="payment"
            v-on:formCancel="hide()"
            v-on:formSubmit="save"></PaymentForm>
    </modal>
</template>

<script>
import PaymentForm from './PaymentForm.vue'
export default {
    name:"ModalPayment",
    components: {PaymentForm},
    data: function() {
        return {
            payment: {}
        }
    },
    methods: {
        show () {
            this.$modal.show('hello-world');
        },
        save ( payment ) {
            debugger;
            this.$emit("save", payment);
        },
        hide () {
            this.$modal.hide('hello-world');
        }
    }
}
</script>