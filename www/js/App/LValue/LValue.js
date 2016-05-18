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
        vm.unitselected=false;
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
            $scope.area = {};
            $scope.area.Unit='sqf';
            $scope.area.unitPrev='sqf'
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
                            if (!$scope.area.data) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.area.data;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {

                calculate();
                console.log('Tapped!', res);
                vm.area=res;
                console.log(res);
            });
            $scope.changeunit=function(){
                if($scope.area.data){
                    if( $scope.area.Unit==='H'){
                        if($scope.area.unitPrev==='A'){
                            $scope.area.data=($scope.area.data *0.40468726267).toFixed(5);
                        }
                        else if($scope.area.unitPrev==='sqf')
                            $scope.area.data=($scope.area.data *0.0000092903412).toFixed(5);

                        $scope.area.unitPrev='H';
                    }
                    else if($scope.area.Unit==='A'){

                        if($scope.area.unitPrev==='H'){
                            $scope.area.data=($scope.area.data * 2.4710439202).toFixed(5);
                        }
                        else if($scope.area.unitPrev==='sqf')
                            $scope.area.data=($scope.area.data *0.000022956841139).toFixed(5);

                        $scope.area.unitPrev='A';
                    }
                    else{
                        if($scope.area.unitPrev==='H'){
                            $scope.area.data=Number(Math.round($scope.area.data *107638.67316)+'e'+0);
                            //$scope.area.data=($scope.area.data * 107638.67316).toFixed(5);
                        }
                        else if($scope.area.unitPrev==='A')
                            $scope.area.data=Number(Math.round($scope.area.data *43560)+'e'+0);
                        //$scope.area.data=($scope.area.data *43560).toFixed(5);
                        $scope.area.unitPrev='sqf';


                    }
                }


                console.log($scope.area.Unit);
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
        //
        function calculate(){

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