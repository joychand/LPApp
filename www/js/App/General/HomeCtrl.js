/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
    'use strict'
    angular.module('LPApp')
        .controller('HomeController',HomeController);
    HomeController.$inject=['$scope']
    function HomeController($scope){
       var vm=this;
        vm.homtitle='Happu';
    }
})();