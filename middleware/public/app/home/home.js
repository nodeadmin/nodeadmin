/* jshint strict: false, camelcase: false */
angular.module('nodeadmin.home', [])
.factory('HSFactory', ['SocketFactory', function (SocketFactory){

  var _homeStat = {};

  _homeStat.socket = SocketFactory.connect('home');

  _homeStat.loadMemory = function(callback) {
    this.socket.emit('pressure');
    this.socket.on('memory', function (mem) {
      callback(mem);
    });
  };

  _homeStat.loadCpus = function(callback) {
    this.socket.emit('clientcpu');
    this.socket.on('servercpu', function (cpus) {
      callback(cpus);
    });
  };

  _homeStat.endSocket = function(callback) {
    this.socket.emit('endpressure');
    this.socket.emit('endclientcpu');
  };

  return _homeStat;

}])
.controller('HomeController', function ($scope, Stats, HSFactory) {
  $scope.loading = true;
  $scope.serverStats = {};

  // memory data
  $scope.labels = [];
  $scope.memory = [
    []
  ];
  $scope.series = [];

  // cpu data
  $scope.cpu_cores = [];


  var toFileSize = function(bytes) {
    var getUnit = function(place) {
      switch(place) {
        case 0:
          return ' Bytes';
        case 1:
          return ' Kb';
        case 2:
          return ' Mb';
        case 3:
          return ' Gb';
        case 4:
          return ' Tb';
        default:
          return 'you\'ve got too much memory';
      }
    };

    var toSize = function(bytes, ind) {
      ind = ind || 0;
      if(isNaN(bytes)) {
        return 'error reading system memory';
      }

      if(bytes < 1024) {
        return bytes + getUnit(ind);
      } else {
        return toSize(bytes /= 1024, ind + 1);
      }
    };
    return toSize(bytes);
  };


  $scope.getServerStats = function() {
    Stats.serverStats()
      .then(function (stats){
        stats.data.memory = toFileSize(stats.data.memory);
        var _load = stats.data.load.reduce(function (avg, sample) {
          return avg += sample;
        }) / 3;

        stats.data.load = _load.toFixed(2) + ' seconds';
        $scope.serverStats = stats.data;
      });

  };

  $scope._memoryStream = function(data) {
    var sizeString = toFileSize( data );

    // series label
    $scope.series.push( sizeString.match(/[A-Za-z]+/)[0] );
    // memory size
    $scope.memory[0].push( sizeString.match(/\d+\.\d{1,2}/,'gi')[0] );

    $scope.labels.push(new Date().toLocaleTimeString());
    if($scope.memory[0].length > 6) {
      $scope.memory[0].shift();
      $scope.labels.shift();
    }
    $scope.$digest();
  };

  $scope._cpuStream = function(data) {
    if($scope.cpu_cores.length > 0) {
      for(var i=0; i < data.length; i++) {
        $scope.cpu_cores[i].times = data[i].times;
      }
    } else {
      for(var i=0; i < data.length; i++) {
        data[i].labels = ['system', 'user', 'idle'];
        data[i]._stat = [data[i].times.sys, data[i].times.user, data[i].times.idle]
      }
      $scope.cpu_cores = data;
    }
    $scope.$digest();
  };

  $scope.load = function() {
    return new Promise(function (resolve, reject) {
      
      $scope.getServerStats();

      HSFactory.loadMemory($scope._memoryStream);
      HSFactory.loadCpus($scope._cpuStream);
      resolve(undefined);
    })
      // load memory stream module
  };

  $scope.load()
  .then(function(){
    $scope.loading = false;
  });

  $scope.$on("$destroy", function () {
    HSFactory.endSocket();
  });

})
.filter('toHours', function () {
  return function (input) {
    return ((input / 1000) / 60) / 60;
  };
});



