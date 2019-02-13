'use strict';
const moment = require('moment');

const formatToBRL = value => {
    if (typeof value == 'string') value = parseFloat(value);
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}`;
}

const attendanceToPercentage = (attendance, total) => {
    return `${Math.round(attendance*100/total)}`;
}

const getMonthDateRange = (month) => {
    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    var startDate = moment().utc().month(month-1).startOf('month');

    // Clone the value before .endOf()
    var endDate = moment(startDate).endOf('month');

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
}

module.exports = {formatToBRL, attendanceToPercentage, getMonthDateRange};
