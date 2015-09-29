angular.module('tagSyncApp', ['ngTagsInput'])
           .controller('tagsController', function($scope, $http) {
             // connect to current URL
             var primus = Primus.connect()

                 primus.on("open", function () {
                                 console.log("Connected!")
                               });


             primus.on("data", function (data) {
                             console.log("data =", data)
                           });


               $scope.tags = [];

               $scope.tagAdded = function(addedTag) {
                 primus.write({msgType:'tagAdded',param:addedTag});
                 console.log(addedTag);
               };

           });
