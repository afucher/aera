'use strict';
const Client = require('../models').Client;

const ClientController = {};


ClientController.getAll = ({filter,limit,offset}) => 
    filter? Client.findAndCountAll({where:{name:{$ilike:filter+'%'}},limit,offset,order:'name'}) : Client.findAndCountAll({limit,offset,order:'name'});
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