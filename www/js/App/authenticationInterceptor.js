/**
 * Created by joy on 14-Jul-16.
 */
angular.module('LPApp')
    .factory('authInterceptorService', ['$q', '$injector', function ($q, $injector) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            var url=config.url;
            console.log(url);
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

        authInterceptorServiceFactory.request = _request;
       /* authInterceptorServiceFactory.responseError = _responseError;*/

        return authInterceptorServiceFactory;
    }]);