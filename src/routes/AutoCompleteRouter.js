'use strict';
const ACController = require('../controllers/AutoCompleteController');

module.exports = [
    {
        method: 'GET',
        path: '/autocomplete/client',
        handler: ({query}, reply) => {
            ACController.client(query.q)
                .then(reply);
        }
    }
];