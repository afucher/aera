'use strict';
const User = require('../../src/models').User;

const authenticatedUser = (server, done) => {
    let opt = {
        method: 'POST',
        url: '/login',
        payload: {
            username: "teste",
            password: "123"
        }
    }
    User.create({username: "teste", password:"123"})
        .then(() => {
            server.inject(opt, response => {
                done(response);
            });
        });

};

module.exports = authenticatedUser;