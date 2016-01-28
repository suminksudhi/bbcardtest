angular
    .module("demo",["dndLists",'ui.router',"shop"])
    .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        $stateProvider

            //default route for layout
            .state('demo', {
                url:'/home',
                templateUrl: 'partials/layout/default.html',
                controller:['$stateParams','$scope',function($stateParams,$scope){
                    $scope.userLoginType = '';
                }]
            })

            //for users this route is applicable
            .state('demo.user', {
                url:'/user',
                templateUrl: 'partials/user.html',
                controller: "UserCtrl",
                resolve:{
                    isLoggedIn : ['$q',function($q){
                        var deferred = $q.defer();
                        if(localStorage.type=='user'){
                            deferred.resolve({status: 'LOGGEDIN', data: {type: 'user'}});
                        }else{
                            deferred.reject({status: 'ERRLOGGEDIN', msg: 'not allowed'});
                        }
                        return deferred.promise;
                    }]
                }

            })

            //for admin this route is applicable
            .state('demo.admin', {
                url:'/admin',
                templateUrl: 'partials/admin.html',
                controller: "AdminCtrl",
                resolve:{
                    isLoggedIn : ['$q',function($q){
                        var deferred = $q.defer();
                        if(localStorage.type=='admin'){
                            deferred.resolve({status: 'LOGGEDIN', data: {type: 'admin'}});
                        }else{
                            deferred.reject({status: 'ERRLOGGEDIN', msg: 'not allowed'});
                        }
                        return deferred.promise;
                    }]
                }

            })

            //for login this route is applicable
            .state('login', {
                url:'/login',
                templateUrl: 'partials/login.html',
                controller: "LoginCtrl"
            })

            .state('logout', {
                url:'/logout',
                controller: ['$state',function($state){
                    delete localStorage.type;
                    $state.go('login')
                }]
            });

        $urlRouterProvider.otherwise("/");
    }])
    .factory('userFactory',['$q',function($q){
        return {
            authenticate : function(options){
                var deferred = $q.defer();
                console.log(options,(options.email=='admin@bbtest.com'));
                if(options.email=='admin@bbtest.com' && options.password=='admin') {
                    localStorage.type = 'admin';
                    deferred.resolve({status: 'LOGGEDIN', data: {type: 'admin'}});
                }else if(options.email=='user@bbtest.com' && options.password=='user') {
                    localStorage.type = 'user';
                    deferred.resolve({status: 'LOGGEDIN', data: {type: 'user'}});
                }else
                    deferred.reject({status:'ERRLOGGEDIN'});
                return deferred.promise;
            }
        }
    }])
    .controller("LoginCtrl",["$scope","userFactory","$state", function($scope,userFactory,$state) {
        $scope.user={};

        //on clicking authenticate
        $scope.authenticate = function() {
            var useremail = $scope.user.email;
            var password = $scope.user.password;
            userFactory
                .authenticate({
                    email:useremail,
                    password:password
                })
                .then(function (response) {
                    console.log(response);
                    if (response.status == 'LOGGEDIN') {
                        switch(response.data.type){
                            case 'user':
                                $state.go('demo.user');
                                break;
                            case 'admin':
                                $state.go('demo.admin');
                                break;
                        }
                    }
                }, function () {

                })
        }
    }])
    .controller("UserCtrl",["$scope", function($scope) {

        $scope.$parent.userLoginType = 'user';
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
            //used to display message
            angular.element(document.getElementsByClassName("message")).html('<div class="alert alert-info"><strong>Hi!</strong> '+item.label + ' dropped at '+ListName+'</div>');
            return item;
        };

    }])

    .controller("AdminCtrl",["$scope", function($scope) {

        $scope.$parent.userLoginType = 'admin';
        $scope.models = {
            selected: null,
            lists: {"O":[],"A": [], "B": []}
        };

        // mock the cards  haven't used mock service for now just generating usin simple for loop
        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.O.push({label: "Item A" + i});
            $scope.models.lists.O.push({label: "Item B" + i});
        }

        //function trigged at end of drop of item into list
        $scope.dropCallback = function(event, index, item,external, type, ListName){
            //used to display message
            angular.element(document.getElementsByClassName("message")).html(item.label + ' dropped at '+ListName);
            return item;
        };

    }]);