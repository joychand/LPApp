/**
 * Created by joychand on 27-03-2016.
 */
(function(){
    angular.module('LPApp')
        .controller('MainController',MainController);
    MainController.$inject=['$ionicSideMenuDelegate','$state'];
    function MainController($ionicSideMenuDelegate,$state){
        var vm=this;
        vm.$state=$state;
        vm.gotohome=gotohome;
        function gotohome(){
            vm.$state.go('app.home');
        }
        vm.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
            /*$state.go('app.sidemenu');*/
        };
       // return vm;
    }
})();