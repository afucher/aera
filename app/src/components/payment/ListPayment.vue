<template>
    <div>
        <div id="payment">
            <input type="checkbox" v-model="onlyPending"  @change="filterPay()">Apenas pendentes</input>
            <v-server-table url="/api/payments" :columns="columns" :options="options" ></v-server-table>
        </div>
    </div>
</template>
 
<script>
import pay from './ModalConfirmPay.vue'
import {Event} from 'vue-tables-2';
    export default {
        name: "AeraListPayment",
        props: ['groupId'],
        data: function(){
            let groupId = groupId;
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
                        value: 'Valor',
                        due_date: 'Vencimento',
                        pay: 'Ação',
                        course: 'Curso',
                        name: 'Nome'
                    },
                    templates : {
                        pay
                    },
                    customFilters: ['onlyPending','groupId'],
                    initFilters:{groupId:groupId,onlyPending:true}
                },
                onlyPending: true
            }
        },
        methods: {
            filterPay(){
                Event.$emit('vue-tables.filter::onlyPending', this.onlyPending);
            }
        }
    }
</script>