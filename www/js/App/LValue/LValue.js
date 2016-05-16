/**
 * Created by Joychand on 15-05-2016.
 */

(function(){
    'use strict'
    angular.module('LPApp')
        .controller('LValueController',LValueController);
    LValueController.$inject=['$scope','PqDataFactory','$ionicScrollDelegate','$ionicModal','$q','$ionicPopup','LVfactory','$state'];
    function LValueController($scope,PqDataFactory,$ionicScrollDelegate,$ionicModal,$q,$ionicPopup,LVfactory,$state)
    {

        var vm = this;
        vm.unitgroup=['UNIT-1','UNIT-2','UNIT-3','UNIT-4'];//hardcoded unitgroup needs to replace
        vm.unitdetail;
        vm.selectedUnit='';
        vm.getunitdetail=getunitdetail;
        vm.selectunit=selectunit;
        vm.onUnitSelect=onUnitSelect;
        vm.enterArea=enterArea;

       /* activate();
        function activate(){
            getunit(vm.selectedUnit).then(function(response){
                vm.unitdetail=response.data;
                console.log(vm.unitdetail);
            })
        }*/
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        vm.selectables = [
            1, 2, 3
        ];

        vm.longList  = [];
        for(var i=0;i<1000; i++){
            vm.longList.push(i);
        }

        vm.selectableNames =  [
            { name : "Mauro", role : "black hat"},
            { name : "Silvia", role : "pineye"},
            { name : "Merlino", role : "little canaglia"},
        ];

        vm.someSetModel = 'Mauro';

        vm.getOpt = function(option){
            return option.name + ":" + option.role;
        };

        vm.shoutLoud = function(newValuea, oldValue){
            alert("changed from " + JSON.stringify(oldValue) + " to " + JSON.stringify(newValuea));
        };

        vm.shoutReset = function(){
            alert("value was reset!");
        };
         function selectunit(){

         }
        function onUnitSelect(i){
            alert( i );
        }
        function enterArea(){
            $scope.data = {};
            $scope.data.food='sqf';
            $scope.data.prev='sqf'
            //Area calculator/convertor popup
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/area_popup.html',
                title: 'Enter Area',

                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>ok</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.area) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.area;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);
                vm.area=res;
                console.log(vm.area);
            });
            $scope.changeunit=function(){
                if($scope.data.food==='H'){
                    if($scope.data.prev==='A'){
                        $scope.data.area=$scope.data.area/2;
                    }
                    else if($scope.data.prev==='sqf')
                        $scope.data.area=$scope.data.area /8;

                    $scope.data.prev='H';
                }
                else if($scope.data.food==='A'){

                    if($scope.data.prev==='H'){
                        $scope.data.area=$scope.data.area * 2;
                    }
                    else if($scope.data.prev==='sqf')
                    $scope.data.area=$scope.data.area /4;

                    $scope.data.prev='A';
                }
                else{
                    if($scope.data.prev==='H'){
                        $scope.data.area=$scope.data.area * 8;
                    }
                    else if($scope.data.prev==='A')
                        $scope.data.area=$scope.data.area *4;
                    $scope.data.prev='sqf';


                }

                console.log($scope.data.food);
            }


        }
        function getunitdetail()
        {
             LVfactory.getMasterLandValue(vm.selectedUnit).then(function(response){
                vm.unitdetail=response.data;
            },function(error){
                 loadingErrorHandler(error);
                 //return $q.reject(error);
             });


        }
        function loadingErrorHandler(error){
            var errmessage;
            if(error.status===0)
            {
                errmessage='Service Unavailable';
            }
            else{
                errmessage='Sorry Fatal Error:' + error.status;
            }
            $ionicPopup.alert({
                title:'Error',
                content:errmessage
            }).then(function(result){
                $state.go('app.home');
            })
            //return $q.reject(promise);
        }


    }

})();