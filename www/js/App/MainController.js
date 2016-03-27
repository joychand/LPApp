/**
 * Created by joychand on 27-03-2016.
 */
(function(){
    angular.module('LPApp')
        .controller('MainController',MainController);
    MainController.$inject=['$ionicSideMenuDelegate'];
    function MainController($ionicSideMenuDelegate){
        var vm=this;

        vm.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft()
            /*$state.go('app.sidemenu');*/
        };
       // return vm;
    }
})();