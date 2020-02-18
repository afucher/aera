const PaymentListController = require('../controllers/PaymentListController');

module.exports = [
    {
    method:'POST',
    path: '/paymentList',
    handler: ({payload}, reply) => {
        PaymentListController.generateReceiptForStudents( payload.ids , payload.month, payload.due_date )
            .then(({data,name}) => {
                reply(data).bytes(data.length).type('application/pdf')
                    .header("Content-Disposition", "attachment; filename=" + name);
            })
            .catch(reply)
    }
}]