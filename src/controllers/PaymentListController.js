'use strict';
const ClientController = require('./ClientController');
const PDFDocument = require('pdfkit');
const paymentPDF = require('../utils/PaymentsListPDF');

const PaymentListController = {};

PaymentListController.generateReceiptForStudents = async (studentIds, month) => {
    
    return Promise.all(studentIds.map(async id => await ClientController.getWithPayments(id,month)))
    .then(students => {
        
        students = students.map(stu => stu.get({plain: true}));
        
        return new Promise((resolve, reject) => {
            let doc = new PDFDocument({size: 'A4'});
            doc.font('Courier');
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers) )
            doc.on('end', ()=>{
                resolve({
                    data: Buffer.concat(buffers),
                    name: 'pagamentos' + '.pdf'
                });
            })
            students.forEach(cli => {
                let clientPayments = cli.ClientGroups.map( cg => {
                    let aux = cg.Payments.map( p => {
                        p.Group = cg.Group
                        return p;
                    });
                    return aux;
                    
                });
                cli.Payments = require('lodash').cloneDeep([].concat(...clientPayments));
                delete cli.ClientGroups;
                delete cli.Group;
                paymentPDF(doc, cli);
                doc.addPage();
            });

            doc.end();
        });
    });
    
    

    
}

module.exports = PaymentListController;