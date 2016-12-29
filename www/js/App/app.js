// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app =angular.module('LPApp', ['ionic','ionic-modal-select','ionicProcessSpinner','templates']);
//var AuthServiceBase = '/eSiroi.Authentication/';
//var ResrcServiceBase = 'http://10.178.2.34/eSiroi.Resource/'
//var ResrcServiceBase = 'http://manipurtemp12.nic.in/LPAppService';
//var ResrcServiceBase = 'http://louchapathap.nic.in/LPAppService';
//var ResrcServiceBase = 'http://localhost/LPAppService';
//var ResrcServiceBase = 'http://localhost:8888/LPAppService';
//var ResrcServiceBase = 'http://localhost/LPAppService';
var ResrcServiceBase = 'http://10.178.2.34/LPAppService';
var APPId = '4d53bce03ec34c0a911182d4c228ee6c';
var APIKey = 'A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc=';
//var JamabandiResrcBase='http://igrmanipur.localhost:9090/'
/*var ResrcServiceBase = 'http://manipurtemp12.nic.in/eSiroi.Resource';*/
app.constant('LPAppSetting', {
    //apiAuthServiceBaseUri: AuthServiceBase,
    apiResrcServiceBaseUri:ResrcServiceBase,
    APPId: '4d53bce03ec34c0a911182d4c228ee6c',
    APIKey:'A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc='

});
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/home');



    $stateProvider
        .state('app',{
            url:'/app',
            abstract:true,
            templateUrl:'General/main.html',
            controller:'MainController',
            controllerAs:'master'
        })

        .state('app.home', {
            url: '/home',
            views: {
                'maincontent@app': {
                    templateUrl: 'General/home.html',
                    controller: 'HomeController',
                    controllerAs:'home'
                },
                'sidemenu@app':{
                    templateUrl:'General/side_menu.html',
                    controller:'sideMenuController',
                    controllerAs:'sMenu'
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
            cache:'false',
            views:{
                'maincontent':{
                    templateUrl:'PattaQuery/PattaQuery.html',
                    controller: 'PqController',
                    controllerAs:'PQuery'
                },
                'sidemenu':{
                    templateUrl:'General/side_menu.html',
                    controller:'sideMenuController',
                    controllerAs:'sMenu'
                }
            }
        })
        .state('app.pqResult',{
            url:'/pqResult',
            views:{
                'maincontent':{
                    templateUrl:'PattaQuery/PQresult.html',
                    controller: 'PqResultController',
                    controllerAs:'Pr'
                },
                'sidemenu':{
                    templateUrl:'General/side_menu.html',
                    controller:'sideMenuController',
                    controllerAs:'sMenu'
                }
            }
        })
        .state('app.disclaimer',{
            url:'/disclaimer',
           
            views:{
                'maincontent':{
                    templateUrl:'General/disclaimer.html',
                    
                },
                'sidemenu':{
                    templateUrl:'General/side_menu.html',
                    controller:'sideMenuController',
                    controllerAs:'sMenu'

                }
            }
        })
    .state('app.contactus',{
        url:'/contactus',

        views:{
            'maincontent':{
                templateUrl:'General/contactus.html',

            },
            'sidemenu':{
                templateUrl:'General/side_menu.html',
                controller:'sideMenuController',
                controllerAs:'sMenu'

            }
        }
    });
});



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
    };
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

app.config(['$httpProvider',function($httpProvider){
    //$httpProvider.interceptors.push('authInterceptorService');
}]);
app.run(['$ionicPlatform','$ionicPopup',function($ionicPlatform,$ionicPopup) {

  $ionicPlatform.ready(function() {
    if (window.connection){
        if(navigator.connection.type===Connection.NONE){
            $ionicPopup.confirm({
                title:'NO INTERNET',
                content:'Please Check your internet connection and try again'
            }).then(function(result){
                if(!result){
                    $ionicPlatform.exitApp();
                }
            });

        }
    }
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
      //window.open=cordova.InAppBrowser.open;
      /*$rootScope.fileURL = cordova.file.externalApplicationStorageDirectory+"jamabandi.pdf";
      console.log($rootScope.fileURL);
      $rootScope.fileTransfer = new FileTransfer();
      console.log( $rootScope.fileTransfer);*/
  });

}]);
