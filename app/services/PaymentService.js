'use strict';

import Vue from 'vue';

export default class PaymentService {
    constructor(){
    }
    pay({clientGroup_id, installment}) {
        return Vue.http.post(`/api/payments/${clientGroup_id}/${installment}/pay`)
    }
}