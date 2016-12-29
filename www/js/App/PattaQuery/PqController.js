/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
        'use strict';
        angular.module('LPApp')
        .controller('PqController',['$scope','$ionicModal','PqDataFactory','PQResModel','$state','$ionicPopup','$q','$ionicLoading','$rootScope',PqController]);


    function PqController($scope,$ionicModal,PqDataFactory,PQResModel,$state,$ionicPopup,$q,$ionicLoading,$rootScope){
        var vm = this;
        vm.village='';
        vm.NewDagNO='';
        vm.NewPattaNo='';
        vm.isProcessing=false;
        vm.btnText='Submit';
        //vm.pqForm;
       /* vm.loading={
            show:show,
            hide:hide
        };*/
        //vm.district=[];
        vm.getDetail=getDetail;
        //vm.createInvoice=createInvoice;
        vm.onDistSelect=onDistSelect;
        vm.onCircSelect=onCircSelect;
        vm.onVillSelect=onVillSelect;
        //vm.onSubmit=onSubmit;
        /*var initModal=initModal;*/
        /*$scope.$broadcast('loadingstart','loading of page started');*/
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles" style="color:#ffffff"></ion-spinner>'
        });
        activate();
        function activate(){



            return getdistricts().then(function(){
                $ionicLoading.hide();
            });

        }

        function getdistricts(){
            return PqDataFactory.getdistrict().then(function (data){
                vm.districts=data;

                return vm.districts;
            },function(error){
                $ionicLoading.hide();
                loadingErrorHandler(error.status);


            });
        }
        function onDistSelect(){
           vm.circle='';
            vm.village='';
            vm.NewDagNO='';
                vm.NewPattaNo='';
            console.log(vm.district);
          return getcircle().then(function(){
           vm.pqForm.dagno.$setPristine();
          });
        }
        function getcircle(){
            //console.log(vm.district);
            return PqDataFactory.getCircles(vm.district.distcode).then(function (data){
                vm.circles=data;
                return vm.circles;
                //console.log(vm.circles);

            },(function(error){
                loadingErrorHandler(error.status);
            }));
        }
        function onCircSelect(){
            vm.village='';
            vm.NewDagNO='';
            vm.NewPattaNo='';
            vm.pqForm.dagno.$setPristine();
            vm.pqForm.pattano.$setPristine();
            return getVill().then(function(){
                console.log('villages success');
            });
        }
        function getVill(){
            return PqDataFactory.getVillages(vm.circle).then(function(data){
                vm.villages=data;
                return vm.villages;
            },function(error){
                loadingErrorHandler(error.status);
            });
        }
        function onVillSelect(){
            vm.NewDagNO='';
            vm.NewPattaNo='';
            vm.pqForm.dagno.$setPristine();
            vm.pqForm.pattano.$setPristine();
        }
        function getDetail() {
            $rootScope.$broadcast('processing');
            vm.pqmodal={};
            console.log(vm.NewDagNO);
            angular.extend(vm.pqmodal,{
                LocCd: vm.village.locCd,
                NewDagNo:vm.NewDagNO,
                NewPattaNo:vm.NewPattaNo
            });
            return getOwners()
                .then(function(success){
                    getPlots()
                        .catch( function(errorCode){detailErrorHandler(errorCode);});
                }, function(errorCode){
                    $rootScope.$broadcast('processComplete');
                    console.log(errorCode);
                   return detailErrorHandler(errorCode);
                });

        }
        function getOwners(){

            return  PqDataFactory.getOwners(vm.pqmodal).then (function(data){
                /*vm.owndetail=[];
                 vm.owndetail=data;*/
                PQResModel.owner={};
                PQResModel.owner=data;
                return PQResModel ;


            },function(error){
                $rootScope.$broadcast('processComplete');
              return $q.reject(error.status);
            });
        }

        function getPlots(){
            return PqDataFactory.getPlot(vm.pqmodal).then(function(data){
                PQResModel.plot={};
                PQResModel.location={};
                PQResModel.locCd='';
                PQResModel.plot=data;
                PQResModel.location={
                    district:vm.district.distDesc,
                    circle:vm.circle.cirDesc,
                    village:vm.village.locDesc
                };
                PQResModel.locCd=vm.village.locCd;

                console.log( PQResModel.plot);
                console.log(PQResModel.location);
                console.log(PQResModel.locCd);
                $rootScope.$broadcast('processComplete');
                $state.go('app.pqResult');
            },function(error){
               return $q.reject(error.status);
            });
        }
        $rootScope.$on('processing',function(){
            vm.isProcessing=true;
            vm.btnText='Processing..';
        });

        $rootScope.$on('processComplete',function(){
            vm.isProcessing=false;
            vm.btnText='Submit';
        });

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
            });
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

            });
        }


        return vm;
    }

})();

/*****************PQRESULTCONTROLLER ********************/
(function(){
    'use strict';
    angular.module('LPApp')
        .controller('PqResultController',PqResultController);

    PqResultController.$inject=['$scope','PQResModel','$http','PattaRptService','$ionicScrollDelegate','$ionicPopup','$q','$ionicLoading','$rootScope'];
    function PqResultController($scope,PQResModel,$http,PattaRptService,$ionicScrollDelegate,$ionicPopup,$q,$ionicLoading,$rootScope){

        var vm=this;
        vm.show=false;
        vm.isdownloading=false;
        vm.btnTxt='Download';
        vm.dwnJamabandi=dwnJamabandi;
        vm.toggleGroup=toggleGroup;
        vm.isGroupShown=isGroupShown;
        vm.owndetail=PQResModel.owner;
        vm.plotdetail=PQResModel.plot;

        vm.location=PQResModel.location;
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
            $rootScope.$broadcast('downloading');
            var rptData ={
                locCd:PQResModel.locCd,
                dagNo: vm.plotdetail.newDagNo,
                pattaNo:vm.plotdetail.newPattaNo

            };


            PattaRptService.createPdf(rptData)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                   // $scope.pdfUrl = URL.createObjectURL(blob);
                    var filename= rptData.locCd+ rptData.dagNo+rptData.pattaNo +'jambnd.pdf';
                    writeToFile(filename,blob);
                    $rootScope.$broadcast('downloadcomplete');

                },function(error){
                    alert('download fail.. plz try again');
                    $rootScope.$broadcast('downloadcomplete');
                    //return $q.reject(error.status);
                });



        }
        function writeToFile(filename,blob){
            //console.log(blob);
            //console.log('writing to file');
            window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(dir){
                 dir.getFile(filename,{create:true},function(fileEntry){
                     console.log('got file', fileEntry);
                     fileEntry.createWriter(function(fileWriter){
                         fileWriter.onwriteend=function(e){
                             $rootScope.$broadcast('downloadcomplete');
                             //console.log('Download Complete');
                             //console.log(fileEntry.fullPath);
                             cordova.plugins.fileOpener2.open(
                                 cordova.file.externalApplicationStorageDirectory+filename, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                                 'application/pdf',
                                 {
                                     error : function(e) {
                                         alert('No Apps found to open the pdf');
                                         $rootScope.$broadcast('downloadcomplete');
                                     },
                                     success : function () {
                                         $rootScope.$broadcast('downloadcomplete');
                                         console.log('file opened successfully');
                                     }
                                 }
                             );
                         };
                         fileWriter.onerror=function(e){
                             alert('Download fail');
                             $rootScope.$broadcast('downloadcomplete');
                         };
                         fileWriter.write(blob);
                         $rootScope.$broadcast('downloadcomplete');
                     });
                 });
            });



        }

        $rootScope.$on('downloading',function(){
            vm.isdownloading=true;
            vm.btnTxt='Downloading....';
        });

        $rootScope.$on('downloadcomplete',function(){
            vm.isdownloading=false;
            vm.btnTxt='Download';
        });

    }
})();