<template>
    <div>
        <button @click.prevent="show">Pagar</button>
        <modal :name="modalName">
            <p>Confirma o pagamento de {{data.value}} ?</p>
            <p>Parcela: {{data.installment}}</p>
            <p>Vecimento: {{data.due_date}}</p>
            <button @click.prevent="pay">Confirmar</button>
            <button @click.prevent="hide">Cancelar</button>
        </modal>
    </div>
</template>

<script>
import PaymentService from '../../services/PaymentService'
let service = new PaymentService();
export default {
    name:"ModalConfirmPay",
    props: ["data"],
    computed: {
        modalName: function () {
        // `this` aponta para a instância Vue da variável `vm`
        return `confirm-pay-${this.data.clientGroup_id}-${this.data.installment}`
        }
    },
    methods: {
        show () {
            this.$modal.show(this.modalName);
        },
        pay ( ) {
            service.pay(this.data)
                .then(this.hide());
        },
        hide () {
            this.$modal.hide(this.modalName);
        }
    }
}
</script>