'use strict';
const PDFDocument = require('pdfkit');

const printHeader = doc => {
    const opt = {continued: true};
    doc.text("Curso", opt);
    doc.x = 200;
    doc.text("Data de inicio", opt);
    doc.x = 250;
    doc.text("Data de fim", opt);
    doc.x = 300;
    doc.text("Frequência");
}

const printRow = (doc, group) => {
    const opt = {continued: true};
    doc.text(`${group.Group.Course.name}`, opt);
    doc.x += 200;
    doc.text(`${group.Group.start_date}`, opt);
    doc.x = 250;
    doc.text(`${group.Group.end_date}`, opt);
    doc.x = 300;
    doc.text(`${group.attendance}/${group.Group.classes}`);
}

module.exports = client => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument();
        let buffers = [];
        doc.text('Certificado Regulus');
        doc.moveDown();
        doc.text(`Nome: ${client.name}`);
        doc.moveDown();
        doc.text('Cursos:');
        printHeader(doc);
        client.ClientGroups.forEach(group => {
            printRow(doc, group);
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
    

