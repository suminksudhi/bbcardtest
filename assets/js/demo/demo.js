//j entry point demo main module using uiroute and dndlist as dependency

angular
    .module("demo",["dndLists",'ui.router'])
    .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

        $stateProvider

            //default route for now
            .state('demo', {
                url:'/homeuser',
                templateUrl: 'partials/homeuser.html',
                controller: "SimpleDemoController"
            })
            .state('demo.admin', {
                url:'/homeadmin',
                templateUrl: 'partials/homeadmin.html',
                controller: "SimpleDemoController"
            })

            .state('login', {
                url:'/login',
                templateUrl: 'partials/login.html',
                controller: "LoginCtrl"
            });

        $urlRouterProvider.otherwise("/homeuser");
    }])
    .controller("SimpleDemoController",["$scope", function($scope) {

        $scope.models = {
            selected: null,
            lists: {"O":[],"A": [], "B": [],"C": []}
        };

        // mock the cards  haven't used mock service for now just generating usin simple for loop
        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.O.push({label: "Item A" + i});
            $scope.models.lists.O.push({label: "Item B" + i});
            $scope.models.lists.O.push({label: "Item c" + i});
        }


        //function trigged at end of drop of item into list
        $scope.dropCallback = function(event, index, item,external, type, ListName){
            console.log(event, index, item,external, type, ListName,angular.element(document).find('.message'));

            //used to display message
            angular.element(document.getElementsByClassName("message")).html(item.label + ' dropped at '+ListName);
            return item;
        };


        // Model to JSON for demo purpose
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

    }]);