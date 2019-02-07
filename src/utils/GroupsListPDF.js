'use strict';
const PDFDocument = require('pdfkit');
module.exports = (group) => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({size:'A4', margin:50});
        let buffers = [];
        doc.font('Courier');
        doc.text(`Lista do Curso: ${group.Course.name}`,{continued:true});
        doc.text(' '.repeat(20),{continued:true});
        doc.text('Data: __/__/____')
        doc.moveDown();
        doc.text(`Professor(a): ${group.Teacher.name}`);
        doc.moveDown();
        doc.text(`Data de início: ${group.start_date}`);
        doc.text('-'.repeat(65));
        doc.moveDown();
        doc.text('Alunos: ')
        group.Students.forEach(student => {
            doc.moveDown();
            doc.text(`${student.name}: ${'_'.repeat(60-student.name.length+2)}`);
        })
        doc.on('data', buffers.push.bind(buffers) )
        doc.on('end', ()=>{
            resolve({
                data: Buffer.concat(buffers),
                name: group.Course.name + '.pdf'
            });
        })
        doc.end();
    });
}
    

