var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.dbSQL;

dataSource.discoverSchema('user', {schema: 'api_lb-acl-discovered'},
    function(err, schema) {
        if (err) throw err;

        console.log(JSON.stringify(schema, null, '  '));

        dataSource.disconnect();
    });