angular.module('authService', [])

// ===================================================
// AUTH FACTORY TO LOGIN AND GET INFORMATION
// INJECT $http FOR COMMUNICATING WITH THE API
// INJECT $q TO RETURN PROMISE OBJECTS
// INJECT AuthToken TO MANAGE TOKENS
// ===================================================
    .factory('Auth', function($http, $q, AuthToken) {


// CREATE AUTH FACTORY OBJECT
        var authFactory = {};

// LOG A USER IN
        authFactory.login = function(username, password) {

// RETURN THE PROMISE OBJECT AND ITS DATA
            return $http.post('/api/authenticate', {
                username: username,
                password: password
            })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

// LOG A USER OUT BY CLEARING THE TOKEN
        authFactory.logout = function() {
            // clear the token
            AuthToken.setToken();
        };

// CHECK IF A USER IN LOGGED IN
// CHECK IF THERE IS A LOCAL TOKEN
        authFactory.isLoggedIn = function() {
            if (AuthToken.getToken())
                return true;
            else
                return false;
        };

// GET THE LOGGED IN USER
        authFactory.getUser = function() {
            if (AuthToken.getToken())
                return $http.get('/api/me', { cache: true });
            else
                return $q.reject({ message: 'User has no token.' });
        };

// RETURN AUTH FACTORY OBJECT
        return authFactory;

    })

// ===================================================
// FACTORY FOR HANDLIN TOKENS
// INJECT $window TO STORE TOKEN CLIENT-SIDE
// ===================================================
    .factory('AuthToken', function($window) {

        var authTokenFactory = {};

// GET THE TOKEN OUT OF LOCAL STORAGE
        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token');
        };


// THIS IS A FUNCTION TO SET TOKEN OR CLEAR TOKEN
// IF TOKEN IS PASSED, SET THE TOKEN
// IF THERE IS NO TOKEN, CLEAR IT FROM LOCAL STORAGE
        authTokenFactory.setToken = function(token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

        return authTokenFactory;

    })

// ===================================================
// APPLICATION CONFIGURATION TO INTEGRATE TOKEN INTO REQUESTS
// ===================================================
    .factory('AuthInterceptor', function($q, $location, AuthToken) {

        var interceptorFactory = {};

// THIS WILL HAPPEN ON ALL HTTP REQUESTS
        interceptorFactory.request = function(config) {

// GRAB THE TOKEN
            var token = AuthToken.getToken();

// IF TOKEN EXISTS, ADD IT TO THE HEADER AS x-access-token
            if (token)
                config.headers['x-access-token'] = token;

            return config;
        };

// THIS HAPPENS ON RESPONSE ERRORS
        interceptorFactory.responseError = function(response) {

// IF OUR SERVER RETURNS A 403 FORBIDDEN RESPONSE
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/login');
            }

// RETURN THE ERRORS FROM THE SERVER AS A PROMISE
            return $q.reject(response);
        };

        return interceptorFactory;

    });
