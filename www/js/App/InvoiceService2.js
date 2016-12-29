/**
 * Created by DELL on 25-03-2016.
 */
(function () {
    angular.module('LPApp').factory('PattaRptService', ['$q','$http','PqDataFactory', PattaRptService]);

    function PattaRptService($q,$http,PqDataFactory) {
        function createPdf(rptData) {
            return $q(function (resolve, reject) {

                PqDataFactory.getJamabandi(rptData).then(function(data){
                    var pdf =data;
                     resolve(pdf)  ;

                },function(error){
                    reject(error);
                });


            });
        }

        return {
            createPdf: createPdf
        };
    }

})();

