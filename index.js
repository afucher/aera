'use strict';
const Hapi = require('hapi');
const Path = require('path');
const User = require('./src/models').User;

const CookieSecret = process.env.COOKIE || 'O*&DI@H*&dnq87921hdHD!@HD82feuiA';

const server = new Hapi.Server();
server.connection({
    port: 3000, routes: {
        files: {
            relativeTo: Path.join(__dirname, 'app')
        },
        validate: {
            options: {
                abortEarly: false
            }
        }
    }
});

server.register([require('inert'),require('hapi-auth-cookie'),{
    register: require('./src/plugins/AeraPlugin'),
    routes: {
        prefix: '/api'
    }
}], (err) => {

    server.auth.strategy('session', 'cookie', {
        password: CookieSecret,
        cookie: 'aera',
        isSecure: false
    });
    server.auth.default('session');

    server.route({
        method: 'GET',
        path: '/{filename*}',
        config: {
            handler: {
                file: function (request) {
                    return request.params.filename;
                }
            },
            auth: {mode:'try'}
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            handler: (request, reply) => {
                if (!request.payload) {
                    reply("wrong login");
                    return;
                }
                let username = request.payload.username;
                let password = request.payload.password;
                User.findOne({
                        where: {
                            username: username
                        }
                    })
                    .then((user) => checkUser(user, password))
                    .then((user) => {
                        request.cookieAuth.set({username:username});
                        reply(user);
                    }).catch(reply);
            },
            auth: { mode: 'try' }
        }
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/logout',
        handler: (request, reply) => {
            request.cookieAuth.clear();
            reply.redirect('/');
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

const checkUser = (user,password) => new Promise((resolve, reject) => {
    if(!user) reject(false);
    user.comparePassword(password, (err, same) => {
        same ? resolve(user) : reject(false);
    })
});
