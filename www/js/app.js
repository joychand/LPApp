// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app =angular.module('LPApp', ['ionic'])
app.config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/app/todos')

  $stateProvider
      .state('app', {

    url: '/app',
     abstract: true,
   // views: {
     // main: {
        templateUrl: 'main.html',
          controller:'mainController'
      //}
    //}

  })
  .state('app.todos', {
    url: '/todos',
    views: {
     'todos@app': {
        templateUrl: 'todos.html',
        controller: 'TodosCtrl'
     }
    }
  })

 .state('app.help', {
    url: '/help',
   views: {
      'help@app': {
        templateUrl: 'help.html'
     }
   }
  })
    });
   app.controller('TodosCtrl', function($scope) {
      $scope.todos = [
        {title: "Take out the trash"},
        {title: "Do laundry"},
        {title: "Start cooking dinner"}
      ]
    });
app.controller('mainController', function($scope,$ionicSideMenuDelegate){
    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})