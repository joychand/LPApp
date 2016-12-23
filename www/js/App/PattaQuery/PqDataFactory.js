/**
 * Created by DELL on 27-03-2016.
 */
(function(){
    'use strict';
    angular.module('LPApp')
        .factory('PqDataFactory',PqDataFactory);
    PqDataFactory.$inject=['$http','LPAppSetting','$q','$httpParamSerializerJQLike'];
    function PqDataFactory($http,LPAppSetting,$q, $httpParamSerializerJQLike){
        var service={
            getdistrict:getdistrict,
            getCircles:getCircles,
            getVillages:getVillages,
            getOwners:getOwners,
            getPlot:getPlot,
            getPdf:getPdf,
            getJamabandi:getJamabandi

        };
         return service;
        function getdistrict (){
            return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getDistrict', {cache:false})
                .then(success)
                .catch(failure);

        }
        function getCircles (distcode){
            //return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getCircle',{params:{dcode:distcode}})
            return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/'+ distcode +'/getCircle', {cache:false})
                .then(success)
                .catch(failure);

        }
        function getVillages (circle){
            var data =circle;
            console.log(data);
            return $http.post(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/postVillage', data, {cache:false})
                .then(success)
                .catch(failure);

        }
        function getOwners(pqmodal){
          return $http.post(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getOwnDetail', pqmodal, {cache:false})
              .then (success)
              .catch(failure);
        }
        function getPlot(pqmodal){
            return $http.post(LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/getplotDetail',pqmodal, {cache:false})
                .then(success)
                .catch(failure);


        }
        function getPdf(){
            return $http.get(LPAppSetting.apiResrcServiceBaseUri +'/api/SRController/gettrialPdf',{responseType:'arraybuffer'})
                .then(success)
                .catch(failure);
        }
        function getJamabandi(rptData){
            var data= {
                LocCd:rptData.locCd,
                NewPattaNo:rptData.pattaNo,
                NewDagNo:rptData.dagNo
            };
            return $http({
                url: LPAppSetting.apiResrcServiceBaseUri +'/api/LPAppController/Jamabandi',
                method: 'POST',
                data:data ,
                responseType:'arraybuffer'
            })
          /* return $http({
                url: 'http://igrmanipur.vagrantshare.com/jamabandi/api/patta/jamabandipdf.php',
                method: 'POST',
                data: $httpParamSerializerJQLike(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
               responseType:'arraybuffer'
            })*/
               .then (success)
               .catch(failure);
            /*return $http.get('http://localhost:8090/mdf/examples/apitest.php',{responseType: 'arraybuffer'})
                .then(success).catch(failure);*/
        }
        function success(response){
            return response.data;
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