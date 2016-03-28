/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
    'use strict'
    angular.module('LPApp')
        .controller('PqController',['$scope','$ionicModal','InvoiceService','PqDataFactory',PqController]);

   /* function PqController($scope,$ionicModal,InvoiceService){
        var vm = this;

        setDefaultsForPdfViewer($scope);

        // Initialize the modal view.
        $ionicModal.fromTemplateUrl('pdf-viewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

        vm.createInvoice = function () {
            var invoice = getDummyData();

            InvoiceService.createPdf(invoice)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                    $scope.pdfUrl = URL.createObjectURL(blob);

                    // Display the modal view
                    vm.modal.show();
                });
        };

        // Clean up the modal view.
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

        return vm;
    }*/
    function PqController($scope,$ionicModal,InvoiceService,PqDataFactory){
        var vm = this;
        //vm.district=[];
        vm.createInvoice=createInvoice;
        var initModal=initModal;

        activate();
        function activate(){
            return getdistricts().then(function(){

            })
            setDefaultsForPdfViewer($scope);
            initModal();
        }

        // Initialize the modal view.
        function initModal(){
            $ionicModal.fromTemplateUrl('pdf-viewer.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modal = modal;
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
