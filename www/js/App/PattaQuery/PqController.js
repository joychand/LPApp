/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
        'use strict'
        angular.module('LPApp')
        .controller('PqController',['$scope','$ionicModal','InvoiceService','PqDataFactory','PQResModel','$state',PqController]);


    function PqController($scope,$ionicModal,InvoiceService,PqDataFactory,PQResModel,$state){
        var vm = this;
        vm.village='';
        vm.NewDagNO='';
        vm.NewPattaNo='';
        //vm.district=[];
        vm.getDetail=getDetail;
        vm.createInvoice=createInvoice;
        vm.onDistSelect=onDistSelect;
        vm.onCircSelect=onCircSelect;
        vm.onSubmit=onSubmit;
        /*var initModal=initModal;*/

        activate();
        function activate(){

            return getdistricts().then(function(){
                setDefaultsForPdfViewer($scope);
                initModal();
            })

        }

        // Initialize the modal view.
        function initModal(){
            $ionicModal.fromTemplateUrl('pdf-viewer.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modal = modal;
                console.log(vm.modal);
            });
        }

        function createInvoice() {
            var invoice = getDummyData();

            InvoiceService.createPdf(invoice)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                    $scope.pdfUrl = URL.createObjectURL(blob);

                    // Display the modal view
                    vm.modal.show();
                });
        };
        function getdistricts(){
            return PqDataFactory.getdistrict().then(function (data){
                vm.districts=data;
                //console.log(vm.districts);
                return vm.districts;
            })
        }
        function onDistSelect(){
           vm.circle='';
            vm.village='';
            vm.NewDagNO='';
                vm.NewPattaNo='';
          return getcircle().then(function(){
              console.log('dfdfdfdf');
          })
        }
        function getcircle(){
            console.log(vm.district);
            return PqDataFactory.getCircles(vm.district).then(function (data){
                vm.circles=data;
                return vm.circles;
            })
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
            return getOwners().then(getPlots);
        }
        function onSubmit(){
            return PqDataFactory.getPdf().then(function(pdf){
                var blob = new Blob([pdf], { type: 'application/pdf' });
                $scope.pdfUrl = URL.createObjectURL(blob);

                // Display the modal view
                vm.modal.show();
            })
        }
        function getPlots(){
            return PqDataFactory.getPlot(vm.pqmodal).then(function(data){
                PQResModel.plot={};
                PQResModel.plot=data;
                console.log( PQResModel.plot);
                $state.go('app.pqResult');
            })
        }


        function getOwners(){

           return  PqDataFactory.getOwners(vm.pqmodal).then (function(data){
              /*vm.owndetail=[];
               vm.owndetail=data;*/
               PQResModel.owner={};
               PQResModel.owner=data;
               return vm.owndetail;


           })
        }

        // Clean up the modal view.
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

        return vm;
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

})();
(function(){
    'use strict'
    angular.module('LPApp')
        .controller('PqResultController',PqResultController);
    PqResultController.$inject=['$scope','PQResModel','$http'];
    function PqResultController($scope,PQResModel,$http){
        var vm=this;
        vm.dwnJamabandi=dwnJamabandi;

        vm.owndetail=PQResModel.owner;
        vm.plotdetail=PQResModel.plot;
        /*vm.changelayout=changelayout;*/
        /*document.addEventListener("deviceready", onDeviceReady, false);
        function changelayout(){
            console.log(screen);
            window.screen.lockOrientation('potrait');
        }

            function onDeviceReady()
            {
                vm.changelayout() ;

                /!*$scope.changeOriantationPortrait = function() {
                    screen.lockOrientation('portrait');
                }*!/
            }*/
            function dwnJamabandi(){
                window.open(encodeURI('http://10.178.2.34:8090/uniLouchaPathap/api/patta/jamabandipdf.php?d=বিষ্ণুপুর&c=নম্বোল&v=024-বলরাম খুল&dg=329&p=309&l=0602001024&rid=t'), '_system');
                /*return $http.get('http://10.178.2.34:8090/uniLouchaPathap/api/patta/jamabandipdf.php',
                    {params:{
                        d:'বিষ্ণুপুর',
                        c:'নম্বোল',
                        v:'024-বলরাম খুল',
                        dg:'329',
                        p:'309',
                        l:'0602001024',
                        rid:'t'
                    }})
                    .then (function(response){
                        var blob = new Blob([response.data], { type: 'application/pdf' });
                         var pdfUrl = URL.createObjectURL(blob);
                        console.log(pdfUrl)
                        //var ref=window.open(encodeURI(pdfUrl), '_system');
                        var ref=window.open(pdfUrl, '_system');
                    }).then(function(error){
                        console.log('error');
                    });*/

            }

                //console.log(vm.owndetail);
    }
})();