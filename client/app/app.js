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
    $httpProvider.defaults.headers.common = 'Access-Control-Allow-Origin: *';
    $httpProvider.defaults.headers.common = 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT';
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
      return;
    };
    var getYelpEntry = function() {
      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10 // Seconds.
      };
      var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+in+' + useLocation + '&radius=400&key='+ GOOGLE_API_KEY
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
      getYelpEntry: getYelpEntry,
    }
  })

  //factory for database functions
  .factory('place', function($http) {
    var addOne = function(place) {
      console.log('about to add a new entry from the factory')
      return $http({
        method: 'POST',
        url: '/api/places/',
        data: place
      });
    };

    var getAll = function () {
      console.log('getting to getAll');
      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10 // Seconds.
      };
      return $http({
        method: 'GET',
        url: '/api/places/',
        headers: headers
      })
      .then(function (resp) {
        return resp.data;
      });
    };

    return {
      addOne: addOne,
      getAll: getAll
    }
  })

  //build all controllers here
  .controller('welcomeCtrl', function($scope, yelper) {
    $scope.clicked = function () {
      yelper.setLocation($scope.place);
    }
  })

  .controller('foodCtrl', function($scope, yelper, $http, place) {
    var images = ['one', 'two', 'three', 'four', 'five', 'six'];
    
    $scope.searching = 'Searching...';

    $scope.data = yelper.getYelpEntry().then(function(response) {
      $scope.searching = "Why don't you try this?";
      $scope.data = response;
      $scope.image = images[Math.floor(Math.random() * images.length)];

      var newEntry = {
        name: $scope.data.name,
      }
      place.addOne(newEntry)
      .then(function (){
        return; 
      })
    }, function errorCallback(response) {
      return response;
    });
    $scope.clicked = function () {
      $scope.searching = 'Searching...'
      $scope.data = yelper.getYelpEntry().then(function(response) {
        $scope.searching = "Why don't you try this?";
        $scope.data = response;
        $scope.image = images[Math.floor(Math.random() * images.length)];
        return;
      }, function errorCallback(response) {
        return response;
      });
    };
    var recents = function () {
      console.log('this happend');
      place.getAll().then(function(places) {
        $scope.places = places;
      });
    };
    recents();
  });

