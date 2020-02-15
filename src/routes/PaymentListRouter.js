const PaymentListController = require('../controllers/PaymentListController');

module.exports = [
    {
    method:'POST',
    path: '/paymentList',
    handler: ({payload}, reply) => {
        PaymentListController.generateReceiptForStudents( payload.ids , payload.month )
            .then(({data,name}) => {
                console.log("cheguei")
                reply(data).bytes(data.length).type('application/pdf')
                    .header("Content-Disposition", "attachment; filename=" + name);
            })
            .catch(reply)
    }
}]