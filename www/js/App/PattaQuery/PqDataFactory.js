/**
 * Created by DELL on 27-03-2016.
 */
(function(){
    'use strict'
    angular.module('LPApp')
        .factory('PqDataFactory',PqDataFactory);
    PqDataFactory.$inject=['$http','LPAppSetting','$q'];
    function PqDataFactory($http,LPAppSetting,$q){
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
            return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getDistrict')
                .then(success)
                .catch(failure);

        }
        function getCircles (distcode){
            return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/' + distcode +'/getCircle')
                .then(success)
                .catch(failure);

        }
        function getVillages (circle){
            var data =circle;
            console.log(data);
            return $http.post(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/postVillage', data)
                .then(success)
                .catch(failure);

        }
        function getOwners(pqmodal){
          return $http.post(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getOwnDetail', pqmodal)
              .then (success)
              .catch(failure);
        }
        function getPlot(pqmodal){
            return $http.post(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getplotDetail',pqmodal)
                .then(success)
                .catch(failure);


        }
        function getPdf(){
            return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/SRController/gettrialPdf',{responseType:'arraybuffer'})
                .then(success)
                .catch(failure);
        }
        function success(response){
            return response.data
            /*if(response.data==='object')
            {
                return response.data;
            }
            else {
                return $q.reject(response.data)
            }*/

        }
        function failure(error){
            return $q.reject(error);

            /*logger.error('XHR failed' + error.data);*/
        }


    }
})();