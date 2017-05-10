angular.module('app').controller('videosCtrl', function($scope, mediaService, $stateParams, $sce, signinService) {


  $scope.test = "videos"

  $scope.getSampleVideos = function() {
    mediaService.getSampleVideos().then(function(response) {
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
