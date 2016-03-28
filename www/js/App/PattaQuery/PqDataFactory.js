/**
 * Created by DELL on 27-03-2016.
 */
(function(){
    'use strict'
    angular.module('LPApp')
        .factory('PqDataFactory',PqDataFactory);
    PqDataFactory.$inject=['$http'];
    function PqDataFactory($http){
        var service={
            getdistrict:getdistrict
       /* getcircles:getcircles,
        getvillages:getvillages*/
        }
         return service;
        function getdistrict (){
            return $http.get('http://10.178.2.34/eSiroi.Resource/api/LPAppController/getDistrict')
                .then(success)
                .catch(failure);

        }
        function getCircles (){
            return $http.get('http://10.178.2.34/eSiroi.Resource/api/LPAppController/getCircles')
                .then(success)
                .catch(failure);

        }
        function getVillages (){
            return $http.get('http://10.178.2.34/eSiroi.Resource/api/LPAppController/getVillages')
                .then(success)
                .catch(failure);

        }
        function success(response){
            return response.data;
        }
        function failure(error){
            /*logger.error('XHR failed' + error.data);*/
        }


    }
})();