'use strict';
const PDFDocument = require('pdfkit');
module.exports = (group) => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument();
        let buffers = [];
        doc.text(`Lista do Curso: ${group.Course.name}`);
        doc.moveDown();
        doc.text(`Data de início: ${group.start_date}`);
        group.Students.forEach(student => {
            doc.moveDown();
            doc.text(student.name);
        })
        doc.on('data', buffers.push.bind(buffers) )
        doc.on('end', ()=>{
            resolve({
                data: Buffer.concat(buffers),
                name: group.Course.name + '.pdf'
            });
            /*reply(data).bytes(data.length).type('application/pdf')
            .header("Content-Disposition", "attachment; filename=" + "meu.pdf");*/
        })
        doc.end();
    });
}
    

