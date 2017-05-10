angular.module('app').controller('videoAlbumCtrl', function($scope, mediaService, $stateParams, signinService) {


  $scope.test = "videoAlbum"

  $scope.getSampleVideos = function() {
    mediaService.getSampleVideos($stateParams.id).then(function(response) {
      $scope.videos = response;
    })
  }

  $scope.getSampleVideos();

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
