'use strict';
const PDFDocument = require('pdfkit');
const alignRight = {align:'right'};
const {formatToBRL} = require('./index.js');

module.exports = (student) => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument();
        let buffers = [];
        let due_date = student.Payments.reduce( (prev, curr) => {
            return prev.due_date < curr.due_date ?
                    prev :
                    curr;
        } ).due_date;
        //doc.pipe(require('fs').createWriteStream('output.pdf'))
        drawReceipt(doc, student, due_date);
        doc.moveDown()
        doc.rect(doc.x, doc.y, doc.page.width - doc.page.margins.right - doc.page.margins.left, 1)
            .stroke()
        doc.moveDown()
        drawReceipt(doc, student, due_date);
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

const drawReceipt = (doc, student, due_date) => {
    let total = 0.0;
    doc.text('REGULUS');
    doc.text(`Pagador: ${student.name}`);
    doc.text(`Vencimento: ${due_date}`);
    student.Payments.forEach(payment => {
        let value = formatToBRL(payment.value);
        doc.moveDown();
        doc.text(`${payment.Group.Course.name} - ${value}`, alignRight);
        total += parseFloat(payment.value);
    })
    doc.moveDown();
    doc.text(`Sub-Total ${formatToBRL(total)}`,alignRight);
    doc.moveDown();
    doc.text(`Desconto R$ ${'_'.repeat(10)}`,alignRight);
    doc.moveDown();
    doc.text(`Total R$ ${'_'.repeat(10)}`,alignRight);
}
    

