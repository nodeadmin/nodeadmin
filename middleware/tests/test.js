var serverenv = exports;
var spawn = require('child_process').spawn;
var fs = require('fs');

serverenv.host = process.env.MYSQL_HOST,
serverenv.port = process.env.MYSQL_PORT,
serverenv.user = process.env.MYSQL_USER,
serverenv.password = process.env.MYSQL_PASSWORD;

// listen for mocha tests and write error to log
serverenv.fakeserver = spawn('node',[process.cwd()+  '/testserver/index.js'], {
    stdio: [
      0,
      'pipe',
      fs.openSync('err.out', 'w')
    ]
});


// temporary work around
serverenv.fakeserver.stdout.on('data', function(data){
  setTimeout(function(){
    serverenv.fakeserver.kill();
  }, 1500)
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

}, 2000)


