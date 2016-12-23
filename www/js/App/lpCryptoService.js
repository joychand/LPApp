/**
 * Created by joy on 15-Jul-16.
 */

(function(){
    'use strict';
    angular.module('LPApp')
        .factory('lpCryptoService',['$q','LPAppSetting',lpCryptoService]);
    function lpCryptoService($q, LPAppSetting){
        //var base64RequestContent='';
        var service={

            computeMD5:computeMD5,
            computeHMACSHA256:computeHMACSHA256,
            str2Uint8array:str2Uint8array,
            Uint82Wdarray:Uint82Wdarray,

        };
        return service;
    }
    function computeMD5(requestContent){

console.log('hahahah');
        // ** VERY IMPORTANT ** change encoding similar to .NET's encoding
      // var utf16le=JSON.stringify(requestContent);
        var jsonContentString = JSON.stringify( requestContent, function( key, value ) {
            if( key === "$$hashKey" ) {
                return undefined;
            }

            return value;
        });

        var requestContentMD5 = CryptoJS.MD5(jsonContentString);

        // encoded the hash result to Base64 encoding
        var b64md5Content = CryptoJS.enc.Base64.stringify(requestContentMD5);
        return b64md5Content;

    }
    function computeHMACSHA256(stringRawData,secretKeyByteArray){
        // ** VERY IMPORTANT ** change encoding similar to .NET's encoding
        var utf16le = CryptoJS.enc.Utf16LE.parse(stringRawData);

        var HmacS256 = CryptoJS.HmacSHA256(utf16le, secretKeyByteArray);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(HmacS256);
       return hashInBase64;
    }
    function str2Uint8array(){

    }
    function Uint82Wdarray(u8arr){
        // Shortcut
        var len = u8arr.length;

        // Convert
        var words = [];
        for (var i = 0; i < len; i++) {
            words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
        }

        return CryptoJS.lib.WordArray.create(words, len);
    }

})();