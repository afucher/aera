'use strict';
const PDFDocument = require('pdfkit');
const alignRight = {align:'right'};
module.exports = (student) => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument();
        let total = 0.0;
        let buffers = [];
        let due_date = student.Payments.reduce( (prev, curr) => {
            return prev.due_date > curr.due_date ?
                    prev :
                    curr;
        } ).due_date;
        doc.pipe(require('fs').createWriteStream('output.pdf'))
        doc.text('REGULUS');
        doc.text(`Pagador: ${student.name}`);
        doc.text(`Vencimento: ${due_date}`);
        student.Payments.forEach(payment => {
            doc.moveDown();
            doc.text(`${payment.Group.Course.name} - ${payment.value}`, alignRight);
            total += parseFloat(payment.value);
        })
        doc.moveDown();
        doc.text(`Sub-Total ${total}`,alignRight);
        doc.on('data', buffers.push.bind(buffers) )
        doc.on('end', ()=>{
            resolve({
                data: Buffer.concat(buffers),
                name: student.name + '.pdf'
            });
        })
        doc.end();
    });
}
    

