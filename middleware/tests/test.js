var common = exports;
var mysql = require('mysql');
var spawn = require('child_process').spawn;
console.log("CURRENT DIR", process.cwd()+ '/testserver/index.js');

common.host = process.env.MYSQL_HOST,
common.port = process.env.MYSQL_PORT,
common.user = process.env.MYSQL_USER,
common.password = process.env.MYSQL_PASSWORD;

common.fakeserver = spawn('node',[process.cwd()+  '/testserver/index.js']);
common.fakeserver.on('data', function(e){
  console.log(d);
})
common.fakeserver.on('err', function(e){
  // console.error(d);
})
common.fakeserver.stdout.on('data', function(data){
  console.log(String(data));
});

// common.connection = mysql.createConnection({
//   host     : process.env.MYSQL_HOST,
//   port     : process.env.MYSQL_PORT,
//   user     : process.env.MYSQL_USER,
//   password : process.env.MYSQL_PASSWORD
// });


// common.connection.connect(function (err) {
//   if(err) {
//     console.error('Please rerun npm test in this format: process.env.MYSQL_HOST process.env.MYSQL_PORT process.env.MYSQL_USER process.env.MYSQL_PASSWORD npm test');
//     console.log('\n \n');
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

// });

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





