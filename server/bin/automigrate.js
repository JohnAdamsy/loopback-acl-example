var path = require('path');
var app = require(path.resolve(__dirname, '../server'));


var dataSource = app.dataSources.dbMongo;

var User = app.models.account;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;
var Team = app.models.Team;

dataSource.automigrate('AccessToken', function(err) {
  if (err) throw err;

  console.log('AccessToken model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('ACL', function(err) {
  if (err) throw err;

  console.log('ACL model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('RoleMapping', function(err) {
  if (err) throw err;

  console.log('RoleMapping model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('Role', function(err) {
  if (err) throw err;

  console.log('Role model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('account', function(err) {
  if (err) throw err;

  console.log('Account (extended) model migrated');
  //dataSource.disconnect();

  User.create([
    {username: 'John', email: 'john@doe.com', password: '123456'},
    {username: 'Jane', email: 'jane@doe.com', password: '123456'},
    {username: 'Bob', email: 'bob@projects.com', password: '123456'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users: ', users);
    // create project 1 and make John the owner
    users[0].projects.create({
      name: 'project1',
      balance: 100
    }, function(err, project) {
      if (err) throw err;

      console.log('Created project', project);

      Team.create([
        {ownerId: project.ownerId, memberId: users[0].id},
        {ownerId: project.ownerId, memberId: users[1].id}
      ], function(err, team){
        if (err) throw err;

        console.log('Created team: ', team);
      });
    });
    // create project 2 and make Jane the owner
    users[1].projects.create({
      name: 'project2',
      balance: 200
    }, function(err, project) {
      if (err) throw err;

      console.log('Created project', project);

      Team.create({
        ownerId: project.ownerId,
        memberId: users[1].id
      }, function(err, team){
        if (err) throw err;

        console.log('Created team: ', team);
      });
    });

    // create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role){
      if (err) throw err;

      console.log('Created role: ', role);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal){
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });

  //dataSource.disconnect();
});