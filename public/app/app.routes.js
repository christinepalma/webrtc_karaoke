angular.module('app.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider



// ROUTE FOR THE HOMEPAGE
            .when('/', {
                templateUrl : 'app/views/pages/home.html'
            })


// ROUTE FOR THE LOGIN PAGE
            .when('/login', {
                templateUrl : 'app/views/pages/login.html',
                controller  : 'mainController',
                controllerAs: 'login'
            })


// SHOW ALL USERS



// FORM TO CREATE A NEW USER
// SAME VIEW AS EDIT PAGE



//PAGE TO EDIT A USER





        $locationProvider.html5Mode(true);

    });
