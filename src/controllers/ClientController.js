'use strict';
const Client = require('../models').Client;

const ClientController = {};

ClientController.getAll = () => Client.findAndCountAll();
ClientController.get = (id) => Client.findById(id);
ClientController.create = (client) => Client.create(client);
ClientController.delete = (id) => Client.destroy({where:{id:id}});

module.exports = ClientController;
