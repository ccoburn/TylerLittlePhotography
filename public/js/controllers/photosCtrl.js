angular.module('app').controller('photosCtrl', function($scope, mediaService, signinService) {


  $scope.test = "photos"

  $scope.getPhotoSampleAlbums = function() {
    mediaService.getPhotoSampleAlbums().then(function(response) {
      $scope.albums = response;
    })
  }

  $scope.getPhotoSampleAlbums();

  function getUser() {
    signinService.getUser().then(function(user) {
      if (user) $scope.user = user.username;
      else   $scope.user = 'NOT LOGGED IN';
    })
  }

  getUser();

  $scope.loginLocal = function(username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      getUser();
    })
  }

  $scope.logout = signinService.logout;



})
