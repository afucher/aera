'use strict';
const PDFDocument = require('pdfkit');
const attendancePercentage = require('../utils/index').attendanceToPercentage;
const columnSize = [100, 150, 100, 100]


const printInfo = (doc, infos) => {
    const {y} = doc;
    const opt = {height: doc.currentLineHeight()};
    let position = doc.page.margins.left;
    infos.forEach((info, index) => {
        const width = columnSize[index];
        position = (index == 0 ? position : position + columnSize[index-1])
        doc.text(info, position, y,  {...opt, width})
    })
}

const printHeader = doc => {
    printInfo(doc, ["Curso","Período","Carga Horária","Frequência"])
}

const printRow = (doc, group) => {
    const rangeDate = `${group.Group.start_date} à ${group.Group.end_date}`;
    const courseLoad = `${group.Group.Course.courseLoad} horas`  
    printInfo(doc, [
        `${group.Group.Course.name}`,
        rangeDate,
        courseLoad,
        `${attendancePercentage(group.attendance,group.Group.classes)}%`
    ])
}

const printFooter = doc => {
    const x = doc.page.margins.left;
    const y = doc.page.height - doc.page.margins.bottom - 70;
    const opt = {align: 'center'};

    doc.font('Courier').fontSize(12)
        .text('REGULUS Cursos Assessoria Astrológica e Com. Ltda.',x, y,opt)
        .fontSize(10)
        .text('Fone: (11) 5549-2655 (14h - 19h)',opt)
        .text('www.regulus.com.br       astrologia@regulus.com.br',opt)
        .text('Rua Estela, 515  Bl.E  7o Andar  São Paulo - SP  CEP: 04011-904',opt);
}


module.exports = client => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({layout : 'portrait', size:'A4'});
        let buffers = [];
        doc.font('Courier').fontSize(12);
        doc.image('./src/utils/logo_regulus_azul.png', doc.page.margins.left , 20 , {width: 100});
        doc.text('Cursos e Assessoria Astrológica', 120);
        doc.x = doc.page.margins.left;
        doc.moveDown(3);
        doc.font('Courier-Bold').fontSize(12);
        doc.text('ATESTADO DE FREQUÊNCIA');
        doc.moveDown();
        doc.font('Courier').fontSize(12);
        doc.text(`Para os devidos fins atestamos que, ${client.name}, portador(a) do CPF: ${client.cpf}, frequentou o(s) seguinte(s) curso(s) de Astrologia:`)
        doc.moveDown();
        doc.font('Courier-Bold').fontSize(10);
        printHeader(doc);
        doc.font('Courier').fontSize(10);
        client.ClientGroups.forEach(group => {
            printRow(doc, group);
        })
        doc.x = doc.page.margins.left;
        doc.moveDown();
        printFooter(doc);

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
    

