angular.module('userApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService'])

// APPLICATION CONFIGURATION TO INTEGRATE TOKEN INTO REQUESTS
    .config(function($httpProvider) {


//ATTACH AUTH INTERCEPTOR TO THE HTTP REQUESTS
        $httpProvider.interceptors.push('AuthInterceptor');

    });
