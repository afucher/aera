'use strict';
const Client = require('../models').Client;

const AutoCompleteController = {};

AutoCompleteController.client = (text) => Client.findAll({ where: { name: {$like: '%' + text + '%'}}, limit: 10 } );
module.exports = AutoCompleteController;