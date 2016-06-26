
    var geeksApp = angular.module("GeeksBoard", ['lumx', 'ngRoute']);

    geeksApp.config(['$routeProvider', function ($routeProvider) {
                    $routeProvider
                    .when('/',{templateUrl:'log.html'})
                    .when('/home',{templateUrl:'home.html'})
                    .otherwise({redirectTo:'/'});
                }]);

    geeksApp.config(function ($httpProvider) {
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {'Content-Type':'application/json'};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
    });

    geeksApp.controller('mainController', function($scope, $rootScope, $location, $http, LxDialogService) {
        $scope.login = function(){
            
            if(($scope.login.user!=undefined)&&($scope.login.password!=undefined)){
            
                $scope.showIndeterminateCircularProgress = true;

        //        window.alert("clicked");
        //        if($scope.login.user == "admin"){
        //            $rootScope.isLogin = true;
        //            $location.path("/home");
        //        }
        //        else {
        //            window.alert("Invalid credentials");
        //        }

                // use $.param jQuery function to serialize data from JSON 
    //                var user_data = JSON.stringify({username: "nobynaresh", password: "Test@123"});
    //
    //                var config = {
    //                    headers : {
    //                        'Content-Type':"application/json",
    //                    }
    //                };
    //                console.log(user_data);
    //                console.log(config);
    //                console.log(config.headers);

        //            $http.post('http://192.168.1.3:8080/users/login', user_data, config) //removed config; by default 'application/json'
        //            .success(function (data, status, headers, config) {
        //                 $rootScope.isLogin = true;
        //                 $location.path("/home");
        ////                console.log(data);
        ////                console.log(status);
        ////                console.log(headers);
        ////                console.log(config);
        //            })
        //            .error(function (data, status, header, config) {
        //                window.alert("Invalid credentials");
        ////                console.log(data);
        ////                console.log(status);
        ////                console.log(header);
        ////                console.log(config);
        //            });



                    $http({
                        method : 'POST',
                        url : 'http://myschool.us-west-2.elasticbeanstalk.com/users/login',  //'http://192.168.1.3/users/login'
                        data : {"username": $scope.login.user, "password": $scope.login.password},


                    }).then(function(response){
//                        console.log(response);
//                        console.log(response.data);
                            if(response.data.message == null){
                            $rootScope.isLogin = true;
                            $location.path("/home");
                        }
                        else {
                            window.alert(response.data.message);
                            $scope.showIndeterminateCircularProgress = false;
                        }
                    }, function(response) {
                         console.log(response);

                    });

        //            $http.get("http://192.168.1.3:8080/users/all")
        //            .then(function(response) {
        //               console.log((response.data[0]));
        //                console.log((response.data[1]));
        //                window.alert(response.data);
        //            });
            }
            };
        
    });