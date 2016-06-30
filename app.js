var geeksApp = angular.module("GeeksBoard", ['lumx', 'ngRoute', 'ngMaterial']);

geeksApp.config(['$routeProvider', function ($routeProvider, $locationProvider) {
                
                $routeProvider
                .when('/',{templateUrl:'log.html'})
                .when('/home',{templateUrl:'home.html', access: {isLogin : true}})
                .when('/test',{templateUrl:'test.html'})
                .otherwise({redirectTo:'/'});
//                $locationProvider.html5Mode(true);   // Enable after setting up the server
            }]);

geeksApp.run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( $rootScope.isLogin == null ) {
        // no logged user, we should be going to #login
        if ( next.templateUrl == "log.html" ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( '/' );
        }
      }         
    });
    
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});
    
    

geeksApp.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {'Content-Type':'application/json'};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});


geeksApp.controller('loginController', function($scope, $rootScope, $location, $http, $mdDialog, userInfoStore) {
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

/*------------------Start AES Encryption Code-------------------------------------------------------------------------------------------*/        
                    
                    var key = aesjs.util.convertStringToBytes("Example256BitKeyForEncryptioniso");
                    
                    
                    var text = 'Text may be any length you wish, no padding is required.';
                    var textBytes = aesjs.util.convertStringToBytes(text);
                
                
                    console.log(text);
                
                    
                    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                    var encryptedBytes = aesCtr.encrypt(textBytes);
                
                    
                
                    var postData = aesjs.util.convertBytesToString(encryptedBytes);
                    console.log(postData);
                                      
                    
                    // The counter mode of operation maintains internal state, so to
                    // decrypt a new instance must be instantiated.
                    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

                    // Convert our bytes back into text
                    var decryptedText = aesjs.util.convertBytesToString(decryptedBytes);
                    console.log(decryptedText);

                
                
                
                
/*------------------End AES Encryption Code-------------------------------------------------------------------------------------------*/               
                
                

                    $http({
                        method : 'POST',
                        url : 'http://myschool.us-west-2.elasticbeanstalk.com/api/users/login',  //'http://192.168.1.3/users/login'
                        data : {"username": $scope.login.user, "password": $scope.login.password},


                    }).then(function(response){
//                        console.log(response);
//                        console.log(response.data);
                            if(response.data.message == null){
                            userInfoStore.userInfo = response.data.user;
//                            console.log(userInfoStore.userInfo);
                            $rootScope.isLogin = true;
                            $location.path("/home");
                        }
                        else {
                            $scope.showAlert = function(ev) {
                                // Appending dialog to document.body to cover sidenav in docs app
                                // Modal dialogs should fully cover application
                                // to prevent interaction outside of dialog
                                $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Something wrong with your credentials')
                                    .textContent(response.data.message)
                                    .ariaLabel('Alert')
                                    .ok('Got it!')
                                    .targetEvent(ev)
                                );
                            };
                            $scope.showAlert();
//                            window.alert(response.data.message);
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



geeksApp.service('userInfoStore', function(){

}); 





geeksApp.controller('homeController',function($scope, $location, $rootScope, $mdDialog, userInfoStore){
    $scope.firstName = userInfoStore.userInfo.firstName;
    $scope.lastName = userInfoStore.userInfo.lastName;
});






geeksApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});