'use strict';

const formatToBRL = value => {
    if (typeof value == 'string') value = parseFloat(value);
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}`;
}

const attendanceToPercentage = (attendance, total) => {
    return `${Math.round(attendance*100/total)}`;
}

module.exports = {formatToBRL,attendanceToPercentage};
