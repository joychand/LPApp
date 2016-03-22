// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app =angular.module('LPApp', ['ionic'])
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/home')

    $stateProvider
        .state('app',{
            url:'/app',
            abstract:true,
            templateUrl:'main.html',
            controller:'mainController'
        })

        .state('app.home', {
            url: '/home',
             views: {
             'maincontent@app': {
                 templateUrl: 'todos.html',
                 controller: 'TodosCtrl'
             },
                 'sidemenu@app':{
                     templateUrl:'side_menu.html'
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
        .state('app.pattaQuery',{
            url:'/pattaQuery',
            views:{
                'maincontent':{
                    templateUrl:'PattaQuery.html',
                    controller:'PqController'
                },
                'sidemenu':{
                    templateUrl:'side_menu.html'

                }
            }
        })
        /*.state('sidemenu', {
            url: '/sidemenu',
            views: {
                'sidemenu@app': {
                    template: '<h2>happu</h2>'
                }
            }

        })*/
})
   app.controller('TodosCtrl', function($scope) {
      $scope.todos = [
        {title: "Take out the trash"},
        {title: "Do laundry"},
        {title: "Start cooking dinner"}
      ]
    });
app.controller('mainController', function($scope,$ionicSideMenuDelegate,$state){
    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft()
        /*$state.go('app.sidemenu');*/
    };
});
app.controller('PqController',function($scope,$ionicModal){
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

})
app.directive('headerShrink', function($document) {
    var fadeAmt;

    var shrink = function(header, content, amt, max) {
        amt = Math.min(44, amt);
        fadeAmt = 1 - amt / 44;
        ionic.requestAnimationFrame(function() {
            header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
            for(var i = 0, j = header.children.length; i < j; i++) {
                header.children[i].style.opacity = fadeAmt;
            }
        });
    };

    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            var starty = $scope.$eval($attr.headerShrink) || 0;
            var shrinkAmt;

            var header = $document[0].body.querySelector('.bar-header');
            var headerHeight = header.offsetHeight;

            $element.bind('scroll', function(e) {
                var scrollTop = null;
                if(e.detail){
                    scrollTop = e.detail.scrollTop;
                }else if(e.target){
                    scrollTop = e.target.scrollTop;
                }
                if(scrollTop > starty){
                    // Start shrinking
                    shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - scrollTop);
                    shrink(header, $element[0], shrinkAmt, headerHeight);
                } else {
                    shrink(header, $element[0], 0, headerHeight);
                }
            });
        }
    }
});
app.directive('scrollWatch', function($rootScope) {
        return function(scope, elem, attr) {
            var start = 0;
            var threshold = 150;

            elem.bind('scroll', function(e) {
                if(e.detail.scrollTop - start > threshold) {
                    $rootScope.slideHeader = true;
                } else {
                    $rootScope.slideHeader = false;
                }
                if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
                    $rootScope.slideHeader = false;
                }
                $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
                $rootScope.$apply();
            });
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
