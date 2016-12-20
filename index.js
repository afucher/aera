'use strict';
const Hapi = require('hapi');
const Path = require('path');

let routes = require('./src/routes');

const server = new Hapi.Server();
server.connection({ port: 3000,routes: {files: {
                relativeTo: Path.join(__dirname, 'app')
            } } });

// Add all the routes within the routes folder
for (var route in routes) {
	server.route(routes[route]);
}

server.register(require('inert'), (err) => {
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

