angular.module('app').controller('mainCtrl', function($scope, mediaService, signinService) {


  $scope.getMedia = function() {
    mediaService.getMedia().then(function(response) {
      $scope.media = response;
    })
  }

  $scope.getMedia();

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
