angular.module('userService', [])

    .factory('User', function($http) {

// CREATE A NEW OBJECT
        var userFactory = {};

// GET A SINGLE USER
        userFactory.get = function(id) {
            return $http.get('/api/users/' + id);
        };

// GET ALL USERS
        userFactory.all = function() {
            return $http.get('/api/users/');
        };

// CREATE A USER
        userFactory.create = function(userData) {
            return $http.post('/api/users/', userData);
        };

// UPDATE A USER
        userFactory.update = function(id, userData) {
            return $http.put('/api/users/' + id, userData);
        };

// DELETE A USER
        userFactory.delete = function(id) {
            return $http.delete('/api/users/' + id);
        };

// RETURN OUR ENTIRE userFactory OBJECT
        return userFactory;

    });