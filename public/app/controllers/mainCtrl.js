angular.module('mainCtrl', [])

    .controller('mainController', function($rootScope, $location, Auth) {

        var vm = this;

//GET INFO IF A PERSON IS LOGGED IN
        vm.loggedIn = Auth.isLoggedIn();



//CHECK TO SEE IF A USER IS LOGGED IN ON EVERY REQUEST
        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.isLoggedIn();



//GET USER INFORMATION ON PAGE LOAD
            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;
                });
        });



//THIS IS A FUNCTION TO HANDLE LOGIN FORM
        vm.doLogin = function() {
            vm.processing = true;

//CLEAR THE ERROR
            vm.error = '';

            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function(data) {
                    vm.processing = false;

//IF A USER SUCCESSFULLY LOGS IN, REDIRECT TO USERS PAGE
                    if (data.success)
                        $location.path('/users');
                    else
                        vm.error = data.message;

                });
        };



//THIS IS A FUNCTION TO HANDLE LOGGING OUT
        vm.doLogout = function() {
            Auth.logout();
            vm.user = '';

            $location.path('/login');
        };



    });
