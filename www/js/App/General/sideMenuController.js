/**
 * Created by DELL on 22-08-2016.
 */
(function(){
    'use strict';
    angular.module('LPApp')
        .controller('sideMenuController',sideMenuController);
    sideMenuController.$inject=['$scope','$state','$ionicPopup'];
    function sideMenuController($scope,$state,$ionicPopup){
        /* jshint validthis: true */
        var vm=this;
        vm.barcodescan=barcodescan;

        function barcodescan(){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    console.log(result);
                    alert(

                        "We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled
                    );
                },
                function (error) {
                    alert(

                        'Scanning failed:' + error
                    );
                },
                {
                    "preferFrontCamera" : false, // iOS and Android
                    "showFlipCameraButton" : true, // iOS and Android
                    "prompt" : "Place a barcode inside the scan area", // supported on Android only
                    "formats" : "all,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
                }
            );
        }
    }
})();