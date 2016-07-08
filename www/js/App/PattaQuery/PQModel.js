/**
 * Created by DELL on 03-04-2016.
 */
(function(){
    angular.module('LPApp')
        .factory ('PQResModel',PQResModel);
    PQResModel.$inject=['$q'];
    function PQResModel($q){
        var service={
            owner:{},
            plot:{},
            location:{},
            locCd:''
        }
        return service;
    }
})();