angular
    .module("shop",['ui.router'])
    .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            //for login this route is applicable
            .state('shop', {
                url:'/',
                templateUrl: 'partials/shop.html',
                controller: "ShopCtrl"
            });

        $urlRouterProvider.otherwise("/");
    }])
    .constant("APPCONSTANT",{
            BASEURL:location.origin,
            DEFAULTINSPIRATION:'EA42D7FBEA24F69E20CE67634153E8CC'
    })
    .factory('shopFactory',['$q','$http',"APPCONSTANT",function($q,$http,APPCONSTANT){
        console.log(APPCONSTANT)
        return {
            getInspiration : function(options){
                var deferred = $q.defer();
                $http.get(APPCONSTANT.BASEURL+'/shopalyst/inspiration/'+APPCONSTANT.DEFAULTINSPIRATION).success(function(response){
                    deferred.resolve({status:"GOTINSPIRATIONDETAIL",data:response})
                }).error(function(response){
                    deferred.resolve({status:"ERRGETTINGINSPIRATIONDETAIL",msg:response})
                })
                return deferred.promise;
            },
            getInspiration1 : function(options){
                var deferred = $q.defer();
                $http.get(APPCONSTANT.BASEURL+'/inspirations/'+APPCONSTANT.DEFAULTINSPIRATION,{
                    params:{
                    apikey:APPCONSTANT.APIKEY
                }}).success(function(response){
                    deferred.resolve({status:"GOTINSPIRATIONDETAIL",data:response})
                }).error(function(response){
                    deferred.resolve({status:"ERRGETTINGINSPIRATIONDETAIL",msg:response})
                })
                return deferred.promise;
            },
            getProductList : function(options){
                var deferred = $q.defer();
                $http.get(URLS.BASEURL,{params:params})
                return deferred.promise;
            },
            getProductDetail : function(options){
                var deferred = $q.defer();
                $http.get(URLS.BASEURL,{params:params})
                return deferred.promise;
            }
        }
    }])
    .controller("ShopCtrl",["$scope","shopFactory","$state", function($scope,shopFactory,$state) {
        shopFactory.getInspiration()
            .then(function(reponse){
                console.log(reponse);
            },function(reponse){
                console.log(reponse);
            })

    }]);