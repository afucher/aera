'use strict';
const Client = require('../models').Client;

const ClientController = {};


ClientController.getAll = ({filter}) => 
    filter? Client.findAndCountAll({where:{name:{$ilike:filter+'%'}}}) : Client.findAndCountAll();
ClientController.get = (id) => Client.findById(id);
ClientController.create = (client) => Client.create(client);
ClientController.delete = (id) => Client.destroy({where:{id:id}});
ClientController.update = (client) => Client.update(client,updateOptions(client.id));

module.exports = ClientController;

const updateOptions = (id) => {
    return {
        where: {
            id
        },
        fields:['name','email','cpf']
    }
}