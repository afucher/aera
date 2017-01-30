'use strict';
const ACController = require('../controllers/AutoCompleteController');

module.exports = [
    {
        method: 'GET',
        path: '/autocomplete/client',
        handler: ({query}, reply) => {
            //console.log(request.query)
            ACController.client(query.q)
                .then(reply);
        }
    }
];