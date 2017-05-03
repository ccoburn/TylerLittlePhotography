angular.module('app').controller('photoAlbumCtrl', function($scope, mediaService, $stateParams) {



  // $scope.getMedia = function() {
  //   $scope.photos = [];
  //   mediaService.getMedia().then(function(response) {
  //     $scope.media = response;
  //     for (var i = 0;i<$scope.media.length;i++) {
  //   if ($scope.media[i].samplealbum == $stateParams.id) {
  //     $scope.photos.push($scope.media[i])
  //   }
  // }
  //   })
  // }
  //
  // $scope.getMedia();

  $scope.getSampleAlbum = function() {
    mediaService.getSampleAlbum($stateParams.id).then(function(response) {
      $scope.photos = response;
    })
  }

  $scope.getSampleAlbum();




})
