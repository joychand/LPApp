// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app =angular.module('LPApp', ['ionic'])
app.config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/')

  $stateProvider.state('app', {
    abstract: true,
    url: '/todos',
    //views: {
     // todos: {
        templateUrl: 'main.html'
     // }
   // }

  })
  $stateProvider.state('app.todos', {
    url: '',
    //views: {
     // todos: {
        templateUrl: 'todos.html',
        controller: 'TodosCtrl'
    // }
    //}
  })

  $stateProvider.state('help', {
    url: '/help',
    views: {
      help: {
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
