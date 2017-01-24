//defining the module

angular.module('foodapp', ['ngRoute'])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/welcome', {
        templateUrl: 'app/partials/welcome.html',
        controller: 'welcomeCtrl'
      })
      .when('/food', {
        templateUrl: 'app/partials/food.html',
        controller: 'foodCtrl'
      })
      .otherwise({
        redirectTo: '/welcome'
      });

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

  //build services here
  //define a factory that will return an object with serv
  .factory('yelper', function($http) {
    //define variable to close to keep track of place
    var useLocation;
    var setLocation = function(location) {
      useLocation = location.split(' ');
      useLocation = useLocation.join('+');
      console.log('LOCATION SET TO THE FOLLOWING', useLocation);
      return;
    };
    var getYelpEntry = function() {
      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=food+in+' + useLocation + '&key='+ GOOGLE_API_KEY
      return $http({
        method: "GET",
        headers: headers,
        url: url
      })
      .then(function successCallback(response) {
        var result = response.data.results
        var randomNum = Math.floor(Math.random() * result.length);
        return response.data.results[randomNum];
      }, function errorCallback(response) {
        return response;
      });
    };

    return {
      setLocation: setLocation,
      getYelpEntry: getYelpEntry
    }
  })

  //build all controllers here
  .controller('welcomeCtrl', function($scope, yelper) {
    $scope.clicked = function () {
      yelper.setLocation($scope.place);
    }
  })

  .controller('foodCtrl', function($scope, yelper, $http) {
    $scope.data = yelper.getYelpEntry().then(function(response) {
      $scope.data = response;
      return;
    }, function errorCallback(response) {
      return response;
    });
  });

