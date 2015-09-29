angular.module('tagSyncApp', ['ngTagsInput'])
           .controller('tagsController', function($scope, $http) {
             // connect to current URL
             var primus = Primus.connect()

                 primus.on("open", function () {
                                 console.log("Connected!")
                                     })

             primus.on("data", function (data) {
                             console.log("data =", data)
                           });

               $scope.tags = [
                   { text: 'just' },
                   { text: 'some' },
                   { text: 'cool' },
                   { text: 'tags' }
               ];

               $scope.tagAdded = function(addedTag) {
                 console.log(addedTag);
               };

           });
