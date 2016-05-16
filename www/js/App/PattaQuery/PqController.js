/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
        'use strict'
        angular.module('LPApp')
        .controller('PqController',['$scope','$ionicModal','InvoiceService','PqDataFactory','PQResModel','$state','$ionicPopup','$q',PqController]);


    function PqController($scope,$ionicModal,InvoiceService,PqDataFactory,PQResModel,$state,$ionicPopup,$q){
        var vm = this;
        vm.village='';
        vm.NewDagNO='';
        vm.NewPattaNo='';
        //vm.district=[];
        vm.getDetail=getDetail;
        //vm.createInvoice=createInvoice;
        vm.onDistSelect=onDistSelect;
        vm.onCircSelect=onCircSelect;
        //vm.onSubmit=onSubmit;
        /*var initModal=initModal;*/

        activate();
        function activate(){

            return getdistricts().then(function(){

            })

        }

        function getdistricts(){
            return PqDataFactory.getdistrict().then(function (data){
                vm.districts=data;
                //console.log(vm.districts);
                return vm.districts;
            },function(error){
                loadingErrorHandler(error.status);

                //console.log(error);
            })
        }
        function onDistSelect(){
           vm.circle='';
            vm.village='';
            vm.NewDagNO='';
                vm.NewPattaNo='';
          return getcircle().then(function(){

          })
        }
        function getcircle(){
            //console.log(vm.district);
            return PqDataFactory.getCircles(vm.district).then(function (data){
                vm.circles=data;
                return vm.circles;
            },(function(error){
                loadingErrorHandler(error.status);
            }))
        }
        function onCircSelect(){
            vm.village='';
            vm.NewDagNO='';
            vm.NewPattaNo='';
            return getVill().then(function(){
                console.log('villages success');
            })
        }
        function getVill(){
            return PqDataFactory.getVillages(vm.circle).then(function(data){
                vm.villages=data;
                return vm.villages;
            },function(error){
                loadingErrorHandler(error.status);
            })
        }
        function getDetail() {
            vm.pqmodal={};
            console.log(vm.NewDagNO);
            angular.extend(vm.pqmodal,{
                LocCd: vm.village,
                NewDagNo:vm.NewDagNO,
                NewPattaNo:vm.NewPattaNo
            });
            return getOwners()
                .then(function(success){
                    getPlots()
                        .catch( function(errorCode){detailErrorHandler(errorCode);});
                }, function(errorCode){
                    console.log(errorCode);
                   return detailErrorHandler(errorCode);
                })

        }
        function getOwners(){

            return  PqDataFactory.getOwners(vm.pqmodal).then (function(data){
                /*vm.owndetail=[];
                 vm.owndetail=data;*/
                PQResModel.owner={};
                PQResModel.owner=data;
                return PQResModel ;


            },function(error){

              return $q.reject(error.status);
            })
        }

        function getPlots(){
            return PqDataFactory.getPlot(vm.pqmodal).then(function(data){
                PQResModel.plot={};
                PQResModel.plot=data;
                console.log( PQResModel.plot);
                $state.go('app.pqResult');
            },function(error){
               return $q.reject(error.status);
            })
        }




        //ERROR HANDLING
        function loadingErrorHandler(errorCode){
            var errmessage;
            if(errorCode===0)
            {
                errmessage='Service Unavailable';
            }
            else{
                errmessage='Sorry Fatal Error:' + errorCode;
            }
            $ionicPopup.alert({
                title:'Error',
                content:errmessage
            }).then(function(result){
                $state.go('app.home');
            })
        }
        function detailErrorHandler(errorCode){
            console.log(errorCode);
            var errmessage;
            var fatalerror;
            if (errorCode===404){

                errmessage='Records not found Plz try Again';
                fatalerror=false;

            }
            else{
                errmessage='Sorry Fatal error.. Plz try again';
                fatalerror=true;
            }
            $ionicPopup.alert({
                title:'Error',
                content:errmessage
            }).then(function(result){
                if(fatalerror){
                    $state.go('app.home');
                }

            })
        }


        return vm;
    }

})();

/*****************PQRESULTCONTROLLER ********************/
(function(){
    'use strict'
    angular.module('LPApp')
        .controller('PqResultController',PqResultController);
    PqResultController.$inject=['$scope','PQResModel','$http','PattaRptService','$ionicScrollDelegate'];
    function PqResultController($scope,PQResModel,$http,PattaRptService,$ionicScrollDelegate){
        var vm=this;
        vm.show=false;
        vm.dwnJamabandi=dwnJamabandi;
        vm.toggleGroup=toggleGroup;
        vm.isGroupShown=isGroupShown;
        vm.owndetail=PQResModel.owner;
        vm.plotdetail=PQResModel.plot;
        console.log(vm.owndetail);
        console.log(vm.plotdetail) ;
        //setDefaultsForPdfViewer($scope);
function toggleGroup(){
    vm.show=!vm.show;
    $ionicScrollDelegate.resize();

}
function isGroupShown(){
    return vm.show;
}

// creat pdf patta and download to local file system and open with mobile default app
        function dwnJamabandi(){
            console.log('dwnldstarted')
            var rptData ={
                pattadar:vm.owndetail,
                plot: vm.plotdetail,
                location:{
                    district:'বিষ্ণুপুর',
                    circle:'নম্বোল',
                    village:'024-বলরাম খুল'

                }

            }
            //cosole.log(rptData.plot);

            PattaRptService.createPdf(rptData)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                   // $scope.pdfUrl = URL.createObjectURL(blob);
                    var filename='PattaDetail2.pdf';
                    writeToFile(filename,blob);

                });
        }
        function writeToFile(filename,blob){
            console.log(blob);
            console.log('writing to file');
            window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(dir){
                 dir.getFile(filename,{create:true},function(fileEntry){
                     console.log('got file', fileEntry);
                     fileEntry.createWriter(function(fileWriter){
                         fileWriter.onwriteend=function(e){
                             console.log('Download Complete');
                             console.log(fileEntry.fullPath);
                             cordova.plugins.fileOpener2.open(
                                 cordova.file.externalApplicationStorageDirectory+filename, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                                 'application/pdf',
                                 {
                                     error : function(e) {
                                         console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                                     },
                                     success : function () {
                                         console.log('file opened successfully');
                                     }
                                 }
                             );
                         };
                         fileWriter.onerror=function(e){
                             console.log('Download fail')
                         };
                         fileWriter.write(blob);
                     })
                 })
            });


        }



        function setDefaultsForPdfViewer($scope) {
            $scope.scroll = 0;
            $scope.loading = 'loading';

            $scope.onError = function (error) {
                console.error(error);
            };

            $scope.onLoad = function () {
                $scope.loading = '';
            };

            $scope.onProgress = function (progress) {
                console.log(progress);
            };
        }

        function getDummyData() {
            return {
                Date: new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" }),
                AddressFrom: {
                    Name: chance.name(),
                    Address: chance.address(),
                    Country: chance.country({ full: true })
                },
                AddressTo: {
                    Name: chance.name(),
                    Address: chance.address(),
                    Country: chance.country({ full: true })
                },
                Items: [
                    { Description: 'iPhone 6S', Quantity: '1', Price: '€700' },
                    { Description: 'Samsung Galaxy S6', Quantity: '2', Price: '€655' }
                ],
                Subtotal: '€2010',
                Shipping: '€6',
                Total: '€2016'
            };
        }



    }
})();