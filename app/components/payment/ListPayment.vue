<template>
    <div>
        <div id="payment">
            <v-server-table url="/api/payments" :columns="columns" :options="options" ></v-server-table>
        </div>
    </div>
</template>
 
<script>
import pay from './ModalConfirmPay.vue'
    export default {
        name: "AeraListPayment",
        data: function(){
            return {
                columns: ['name','value','course','due_date','paid','installment','pay'],
                options: {
                    responseAdapter : function(data) {
                        data.data = data.data.map(payment => {
                            payment.paid = payment.paid ? "pago" : "pendente";
                            return payment;
                        })
                        return data;
                        },
                    headings: {
                        installment: 'Parcela',
                        paid: 'Status',
                        value: 'Valor'
                    },
                    templates : {
                        pay
                    }
                }
            }
        }
    }
</script>