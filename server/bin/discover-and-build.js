var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.dbSQL;

dataSource.discoverAndBuildModels('user', {schema: 'api_lb-acl-discovered'},
    function(err, models) {
        if (err) throw err;

        models.user.find(function(err, accounts) {
            if (err) return console.log(err);

            console.log(accounts);

            dataSource.disconnect();
        });
    });