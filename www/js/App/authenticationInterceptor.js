/**
 * Created by joy on 14-Jul-16.
 */
angular.module('LPApp')
    .factory('authInterceptorService', ['$q', '$injector','LPAppSetting','lpCryptoService', function ($q, $injector,LPAppSetting,lpCryptoService) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            var requestContentBase64String='';
            var requestSignatureBase64String='';
           // var url=config.url;
            var requestUri= encodeURIComponent(config.url.toLowerCase());
            var requestUri=requestUri.toLowerCase();
            var requestTimeStamp=Math.floor( (new Date).getTime() / 1000 );

            console.log(requestTimeStamp);
            var nonce=createGuid();
            var requestHttpMethod=config.method;
            var requestContent=(!config.data) ? '' : config.data;
            if(requestContent){

                requestContentBase64String= lpCryptoService.computeMD5(requestContent)
                console.log('hahah');
            }
            var stringRawData=LPAppSetting.APPId + requestHttpMethod + requestUri + requestTimeStamp + nonce + requestContentBase64String
           console.log('AppId::'+LPAppSetting.APPId  );
            console.log('requestHttpMethod::'+requestHttpMethod );
            console.log('requestUri::'+requestUri  );
            console.log('requestTimeStamp::'+requestTimeStamp  );
            console.log('nonce::'+nonce  );
            console.log(requestContent  );
            console.log('requestContentBase64String::'+requestContentBase64String );
            var secretKeyByteArray = convertFrombase64(LPAppSetting.APIKey);
            requestSignatureBase64String=lpCryptoService.computeHMACSHA256(stringRawData,secretKeyByteArray);
            console.log('requestSignatureBase64String::'+requestSignatureBase64String );
            config.headers.Authorization = 'amx ' + LPAppSetting.APPId+':'+ requestSignatureBase64String +':'+ nonce+':'+requestTimeStamp;
/*

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
*/

            return config;
        }

        /***** Helper functions*******/
        function convertFrombase64(b64ApiKey){
            var byteArray=toByteArray(b64ApiKey);
             var wordArray=enctou8array(byteArray);
            return wordArray;
        }
        /**
         * Converts base64 String to Unt8Array
         *
         *
         *
         **/
        function toByteArray(b64) {
            var lookup = []
            var revLookup = []
            var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
            var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
            for (var i = 0, len = code.length; i < len; ++i) {
                lookup[i] = code[i]
                revLookup[code.charCodeAt(i)] = i
            }

            revLookup['-'.charCodeAt(0)] = 62
            revLookup['_'.charCodeAt(0)] = 63
            var i, j, l, tmp, placeHolders, arr
            var len = b64.length

            if (len % 4 > 0) {
                throw new Error('Invalid string. Length must be a multiple of 4')
            }

            // the number of equal signs (place holders)
            // if there are two placeholders, than the two characters before it
            // represent one byte
            // if there is only one, then the three characters before it represent 2 bytes
            // this is just a cheap hack to not do indexOf twice
            placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0

            // base64 is 4/3 + up to two characters of the original data
            arr = new Arr(len * 3 / 4 - placeHolders)

            // if there are placeholders, only get up to the last complete 4 chars
            l = placeHolders > 0 ? len - 4 : len

            var L = 0

            for (i = 0, j = 0; i < l; i += 4, j += 3) {
                tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
                arr[L++] = (tmp >> 16) & 0xFF
                arr[L++] = (tmp >> 8) & 0xFF
                arr[L++] = tmp & 0xFF
            }

            if (placeHolders === 2) {
                tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
                arr[L++] = tmp & 0xFF
            } else if (placeHolders === 1) {
                tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
                arr[L++] = (tmp >> 8) & 0xFF
                arr[L++] = tmp & 0xFF
            }

            return arr
        }
        /**
         * Converts a Uint8Array to a word array.
         *
         * @param {string} u8Str The Uint8Array.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.u8array.parse(u8arr);
         */
        function enctou8array(u8arr) {

                // Shortcut
                var len = u8arr.length;

                // Convert
                var words = [];
                for (var i = 0; i < len; i++) {
                    words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
                }

                return CryptoJS.lib.WordArray.create(words, len);

        };


     /*   var _responseError = function (rejection) {
            var loggedin = false;
            var authService = $injector.get('authService');
            var state = $injector.get('$state');
            var authData = localStorageService.get('authorizationData');
            if (authData)
            {
                loggedin = true;
            }
            if (rejection.status === 401 && !loggedin) {

                authService.logOut();

                state.go('login');
            }
            return $q.reject(rejection);
        }*/
        function createGuid()
        {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
        authInterceptorServiceFactory.request = _request;
       /* authInterceptorServiceFactory.responseError = _responseError;*/

        return authInterceptorServiceFactory;
    }]);