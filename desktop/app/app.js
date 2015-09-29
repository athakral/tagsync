// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------

// Browser modules are imported through new ES6 syntax.
import { greet } from './hello_world/hello_world';

// Node modules are required the same way as always.
var os = require('os');

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

document.primus = Primus.connect("ws://localhost:8080/primus/");

angular.module('tagSyncApp',[])
           .controller('tagsController',function($scope){
             $scope.tags = [];


                 document.primus.on("open", function () {
                                 console.log("Connected!")
                               });


             document.primus.on("data", function (data) {
                              if(data.msgType && data.msgType === "newTag")
                              {
                                 $scope.tags.push(data.addedTag);
                              }
                             console.log("data =", data)
                             console.log($scope.tags);
                             $scope.$apply();
                           });


           });


angular.element(document).ready(function() {
      angular.bootstrap(document,['tagSyncApp']);
});
