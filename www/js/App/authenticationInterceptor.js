/**
 * Created by joy on 14-Jul-16.
 */
angular.module('LPApp')
    .factory('authInterceptorService', ['$q', '$injector','LPAppSetting', function ($q, $injector,LPAppSetting) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            var requestContentBase64String='';
            var requestSignatureBase64String='';
            var url=config.url;
            var requestUri= encodeURIComponent(config.url.toLowerCase());
            var requestTimeStamp=(new Date).getTime();
            var nonce=createGuid();
            var requestHttpMethod=config.method;
            var requestContent=(!config.data) ? '' : config.data;
            if(requestContent){
                lpCryptoService.computeMD5(requestContent).then(function(md5hash){
                    requestContentBase64String=md5hash;

                },failure);
            }
            var stringRawData='APPId'+ requestHttpMethod + requestUri + requestTimeStamp + nonce + requestContentBase64String
            var secretKeyByteArray = convertFrombase64(LPAppSetting.APIKey);
            requestSignatureBase64String=lpCryptoService.computeHMACSHA256(stringRawData);
            config.headers.Authorization = 'amx ' + 'APPId'+':'+ requestSignatureBase64String +':'+ nonce+':'+requestTimeStamp;
/*

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
*/

            return config;
        }

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