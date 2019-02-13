'use strict';

import Vue from 'vue';

export default class PaymentService {
    constructor(){
    }
    pay({clientGroup_id, installment}) {
        return Vue.http.post(`/api/payments/${clientGroup_id}/${installment}/pay`)
    }
    get({clientGroup_id, installment}) {
        return Vue.http.get(`/api/payments/${clientGroup_id}/${installment}`)
    }
    getTotals(startMonth) {
        return Vue.http.get(`/api/payments/totals?startMonth=${startMonth}`)
    }
}