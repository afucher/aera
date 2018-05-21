'use strict';

const formatToBRL = value => {
    if (typeof value == 'string') value = parseFloat(value);
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}`;
}

module.exports = {formatToBRL};
