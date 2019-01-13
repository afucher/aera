'use strict';
const PDFDocument = require('pdfkit');
module.exports = client => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument();
        let buffers = [];
        doc.text('Certificado Regulus');
        doc.moveDown();
        doc.text(`Nome: ${client.name}`);
        doc.moveDown();
        doc.text('Cursos:')
        client.ClientGroups.forEach(group => {
            doc.moveDown();
            doc.text(`${group.Group.Course.name} - Presença: ${group.attendance}/${group.Group.classes}`);
        })
        doc.on('data', buffers.push.bind(buffers) )
        doc.on('end', ()=>{
            resolve({
                data: Buffer.concat(buffers),
                name: `Certificado_${client.name}.pdf`
            });
        })
        doc.end();
    });
}
    

