'use strict';
const PDFDocument = require('pdfkit');
const attendancePercentage = require('../utils/index').attendanceToPercentage;

const nameSpace = 40;
const rangeDateSpace = 30;
const courseLoadSpace = 16;
//const attendanceSpace = 20;


const printHeader = doc => {
    const opt = {continued: true};
    doc.font('Courier-Bold');
    doc.text("Curso/Módulo", opt);
    doc.text(" ".repeat(nameSpace-12), opt);
    doc.text("Período", opt);
    doc.text(" ".repeat(rangeDateSpace - 7), opt);
    doc.text("Carga Horária", opt);
    doc.text(" ".repeat(courseLoadSpace - 13), opt);
    doc.text("Frequência");
}

const printRow = (doc, group) => {
    doc.font('Courier');
    const opt = {continued: true};
    const rangeDate = `${group.Group.start_date} à ${group.Group.end_date}`;
    const courseLoad = `${group.Group.Course.courseLoad} horas`
    doc.text(`${group.Group.Course.name}`, opt);
    doc.text(" ".repeat(nameSpace-group.Group.Course.name.length), opt);
    doc.text(rangeDate, opt);
    doc.text(" ".repeat(rangeDateSpace-rangeDate.length), opt);
    doc.text(courseLoad, opt);
    doc.text(" ".repeat(courseLoadSpace-courseLoad.length), opt);
    doc.text(`${attendancePercentage(group.attendance,group.Group.classes)}%`);
}

const getTotalCourseLoad = client => client.ClientGroups.reduce((prev, curr) => prev+curr.Group.Course.courseLoad,0);

module.exports = client => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({layout : 'landscape', size:'A4'});
        doc.font('Courier').fontSize(12);

        let buffers = [];
        doc.text('Certificado Regulus');
        doc.moveDown();
        doc.text(`Nome: ${client.name}`);
        doc.moveDown();
        doc.font('Courier-Bold').fontSize(12);
        doc.text('CURSO DE FORMAÇÃO PROFISSIONAL EM ASTROLOGIA');
        doc.moveDown();
        doc.text(`CARGA HORÁRIA: ${getTotalCourseLoad(client)} horas/aula`);
        doc.moveDown(2);
        doc.font('Courier').fontSize(12);
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
    

