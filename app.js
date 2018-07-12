'use strict';

(function () {
    var app = angular.module("userApp", ['ngRoute', 'angular-loading-bar']);
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/person", {
            templateUrl: 'app/views/person.html',
            controller: "PersonCtrl"
        })
        .when("/person/:personId", {
            templateUrl: 'app/views/persondetail.html',
            controller: "PersonAddressCtrl"
        })
        .otherwise({ redirectTo: "/person" })
    });
}());
