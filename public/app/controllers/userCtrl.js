angular.module('userCtrl', ['userService'])

    .controller('userController', function(User) {

        var vm = this;

// SET A PROCESSING VARIABLE TO SHOW LOADING THINGS
        vm.processing = true;


// GRAB ALL THE USERS ON PAGE LOAD
        User.all()
            .success(function(data) {

// WHEN ALL THE USERS COME BACK, REMOVE THE PROCESSING VARIABLE
                vm.processing = false;


// BIND THE USERS THAT COME BACK TO vm.users
                vm.users = data;
            });


// THIS IS A FUNCTION TO DELETE A USER
        vm.deleteUser = function(id) {
            vm.processing = true;

            User.delete(id)
                .success(function(data) {

// GET ALL USERS & UPDATE THE TABLE / RETURN THE LIST OF USERS WITH THE DELETE CALL / SET UP API
                    User.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.users = data;
                        });

                });
        };

    })


// CONTROLLER IS APPLIED TO USER CREATION PAGE
    .controller('userCreateController', function(User) {

        var vm = this;

// THIS VARIBLE WILL HIDE/SHOW ELEMENTS OF THE VIEW / DIFFERENTIATES BETWEEN CREATE AND EDIT PAGES
        vm.type = 'create';

// THIS FUNCTION CREATES A USER
        vm.saveUser = function() {
            vm.processing = true;
            vm.message = '';

// USE THE CREATE FUNCTION IN THE userService
            User.create(vm.userData)
                .success(function(data) {
                    vm.processing = false;
                    vm.userData = {};
                    vm.message = data.message;
                });

        };

    })

// CONTROLLER IS APPLIED TO THE USER EDIT PAGE
    .controller('userEditController', function($routeParams, User) {

        var vm = this;

// THIS VARIABLE WILL HIDE/SHOW ELEMENTS OF THE VIEW / DIFFERENTIATES BETWEEN CREATE OR EDIT PAGES
        vm.type = 'edit';

// GET THE USER DATA FOR THE USER YOU WANT TO EDIT
// $routeParams IS THE WAY WE GRAB DATA FROEM THE URL
        User.get($routeParams.user_id)
            .success(function(data) {
                vm.userData = data;
            });

// THIS IS THE FUNCTION TO SAVE THE USER
        vm.saveUser = function() {
            vm.processing = true;
            vm.message = '';

// CALL THE userService FUNCTION TO UPDATE
            User.update($routeParams.user_id, vm.userData)
                .success(function(data) {
                    vm.processing = false;

// CLEARS THE FORM
                    vm.userData = {};


// BIND THE MESSAGE FROM OUR API TO vm.message
                    vm.message = data.message;
                });
        };

    });
