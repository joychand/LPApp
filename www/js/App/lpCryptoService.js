/**
 * Created by joy on 15-Jul-16.
 */

(function(){
    'use strict'
    angular.module('LpApp')
        .factory('lpCryptoService',['$q','LPAppSetting',lpCryptoService]);
    function lpCryptoService($q, LPAppSetting){
        //var base64RequestContent='';
        var service={

            computeMD5:computeMD5,
            computeHMACSHA256:computeHMACSHA256,
            str2Uint8array:str2Uint8array,
            Uint82Wdarray:Uint82Wdarray,

        }
        return service;
    }
    function computeMD5(requestContent){

    }
    function computeHMACSHA256(){

    }
    function str2Uint8array(){

    }
    function Uint82Wdarray(){

    }

})();