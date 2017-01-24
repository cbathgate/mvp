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
  })

  //build services here


  //build all controllers here
  .controller('welcomeCtrl', function() {

  })

  .controller('foodCtrl', function() {
  });