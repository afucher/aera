'use strict';
const Client = require('../models').Client;

const ClientController = {};
const getAllFields = ['id','name','email','cpf'];

ClientController.getAll = ({filter,limit,offset}) => 
    filter? 
        Client.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:'name',attributes:getAllFields}) : 
        Client.findAndCountAll({limit,offset,order:'name', attributes:getAllFields});
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
        fields:['name','email','cpf','phone','cel_phone','com_phone','address1','address2','address3','zip_code','city','state','profession','teacher']
    }
}