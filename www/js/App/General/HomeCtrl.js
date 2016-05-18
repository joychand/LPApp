/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
    'use strict'
    angular.module('LPApp')
        .controller('HomeController',HomeController);
    HomeController.$inject=['$scope','$state']
    function HomeController($scope,$state){
       var vm=this;
        vm.homtitle='LouchaPathap';
    }
})();