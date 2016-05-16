/**
 * Created by DELL on 27-03-2016.
 */
(function(){
    angular.module('LPApp').
        factory('LVfactory',LVfactory);
    LVfactory.$inject=['$http','$q','LPAppSetting']
    function LVfactory($http,$q,LPAppSetting){
        var service={
            getunit:getunit,
            getMasterLandValue:getMasterLandValue
        }
        return service;

        function getMasterLandValue(){
            return $http.post(LPAppSetting.apiResrcServiceBaseUri + '/api/LPAppController/getlandvalue');
        }
        function getunit(){
            return $http.post(LPAppSetting.apiResrcServiceBaseUri + '/api/LPAppController/getunitgroup');
        }
    }
})();
