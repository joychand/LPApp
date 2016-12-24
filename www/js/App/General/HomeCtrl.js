/**
 * Created by Joychand on 27-03-2016.
 */
(function(){
    'use strict';
    angular.module('LPApp')
        .controller('HomeController',HomeController);
    HomeController.$inject=['$scope','$state','$ionicPopup','$ionicModal','$ionicSlideBoxDelegate'];
    function HomeController($scope,$state,$ionicPopup,$ionicModal,$ionicSlideBoxDelegate){
       var vm=this;
        vm.homtitle='LouchaPathap';
        vm.barcodescan=barcodescan;
        vm.openModal=openModal;

       // vm.tourCaption1="Welcome to LouchaPathap Mobile<br> Please follows the steps on how to use the apps";
        function barcodescan(){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    //console.log(result);
                    //if(result.format==="QR_CODE")
                    //
                    //{
                    //  $scope.result=result;
                    //    openModal();
                    //    $scope.DagNO=result.text;
                    //    $scope.PattaNo=result.format;
                    //}
                    //else{
                        alert(

                            "We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled
                        );
                   // }

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
        $scope.aImages = [{
            'src' : 'img/district.jpg',
            'msg' : 'Welcome to help tour. Swipe to the left<-'
        }, {
            'src' : 'img/circle.jpg',
            'msg' : '<--  swipe  -->'
        }, {
            'src' : 'img/village.jpg',
            'msg' : '<--  swipe  -->'
        },{
            'src' : 'img/newdagno.jpg',
            'msg' : '<--  swipe  -->'
        },{
            'src' : 'img/patta.jpg',
            'msg' : '<--  swipe  -->'
        }, {
            'src' : 'img/submit.jpg',
            'msg' : 'OK got it!. Tap/Click to close '
        }];

        $ionicModal.fromTemplateUrl('image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        function openModal(){
            $ionicSlideBoxDelegate.slide(0);
            $scope.modal.show();
        }



        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('modal.shown', function() {
           // console.log('Modal is shown!');
        });

        // Call this functions if you need to manually control the slides
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.goToSlide = function(index) {
            $scope.modal.show();
            $ionicSlideBoxDelegate.slide(index);
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
        //function openModal()
        //{
        //    $ionicModal.fromTemplateUrl('PattaQuery/modal.html', {
        //        scope: $scope,
        //        animation: 'slide-in-up'
        //    }).then(function(modal) {
        //        $scope.modal = modal;
        //        $scope.DagNO=$scope.result.text;
        //        $scope.PattaNo=$scope.result.format;
        //        $scope.modal.show();
        //    });
        //    $scope.openModal = function() {
        //        $scope.modal.show();
        //    };
        //
        //    $scope.closeModal = function() {
        //        $scope.modal.hide();
        //    };
        //
        //
        //    $scope.$on('$destroy', function() {
        //        $scope.modal.remove();
        //    });
        //
        //    $scope.$on('modal.hidden', function() {
        //        // Execute action
        //    });
        //
        //    $scope.$on('modal.removed', function() {
        //        // Execute action
        //    });
        //}


    }
})();