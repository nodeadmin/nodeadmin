
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

  return _homeStat;

}])
.controller('HomeController', function ($scope, Stats, HSFactory) {

  $scope.serverStats = {};

  $scope.labels = [];

  $scope.memory = [
    []
  ];

  $scope.series = [];


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
          return "you've got too much memory";
      }
    }

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
    }
    return toSize(bytes);
  }


  $scope.getServerStats = function() {
    Stats.serverStats()
      .then(function (stats){
        stats.data.memory = toFileSize(stats.data.memory);
        var _load = stats.data.load.reduce(function (avg, sample) {
          return avg += sample;
        }) / 3;

        stats.data.load = _load.toFixed(2) + ' seconds';
        $scope.serverStats = stats.data;
      })

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

  $scope.load = function() {
    $scope.getServerStats();

    // load memory stream module
    HSFactory.loadMemory($scope._memoryStream);
  };

  $scope.load();

});


