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
            getdistrict:getdistrict,
            getCircles:getCircles,
        getVillages:getVillages,
            getOwners:getOwners,
            getPlot:getPlot,
            getPdf:getPdf
        }
         return service;
        function getdistrict (){
            return $http.get('http://localhost/eSiroi.Resource/api/LPAppController/getDistrict')
                .then(success)
                .catch(failure);

        }
        function getCircles (distcode){
            return $http.get('http://localhost/eSiroi.Resource/api/LPAppController/' + distcode +'/getCircle')
                .then(success)
                .catch(failure);

        }
        function getVillages (circle){
            var data =circle;
            console.log(data);
            return $http.post('http://localhost/eSiroi.Resource/api/LPAppController/postVillage', data)
                .then(success)
                .catch(failure);

        }
        function getOwners(pqmodal){
          return $http.post('http://localhost/eSiroi.Resource/api/LPAppController/getOwnDetail', pqmodal)
              .then (success)
              .catch(failure);
        }
        function getPlot(pqmodal){
            return $http.post('http://localhost/eSiroi.Resource/api/LPAppController/getplotDetail',pqmodal)
                .then(success)
                .catch(failure);


        }
        function getPdf(){
            return $http.get('http://localhost/eSiroi.Resource/api/SRController/gettrialPdf',{responseType:'arraybuffer'})
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