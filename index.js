'use strict';
const Hapi = require('hapi');
const Path = require('path');

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

server.register([require('inert'),{
    register: require('./src/plugins/AeraPlugin'),
    routes: {
        prefix: '/api'
    }
}], (err) => {
    server.route({
        method: 'GET',
        path: '/{filename*}',
        handler: {
            file: function (request) {
                return request.params.filename;
            }
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

