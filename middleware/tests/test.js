var serverenv = exports;
var mysql = require('mysql');
var spawn = require('child_process').spawn;

serverenv.host = process.env.MYSQL_HOST,
serverenv.port = process.env.MYSQL_PORT,
serverenv.user = process.env.MYSQL_USER,
serverenv.password = process.env.MYSQL_PASSWORD;
serverenv.fakeserver = spawn('node',[process.cwd()+  '/testserver/index.js']);

serverenv.fakeserver.on('data', function (res){
  console.log(res);
})
serverenv.fakeserver.on('err', function (res){
  console.error(res);
})
serverenv.fakeserver.stdout.on('data', function(data){
  console.log(String(data));
});


var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.
var mocha = new Mocha();

var testDir = __dirname + '/lib';

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});


setTimeout(function(){
  // Run the tests.
  mocha.run(function(failures){
    process.on('exit', function () {
      process.exit(failures);
    });
  });

},2000)





