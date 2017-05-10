angular.module('app').controller('clientAlbumCtrl', function($scope, mediaService, $stateParams, signinService) {


  $scope.test = "clientAlbum"

  $scope.getClientAlbum = function() {
    mediaService.getClientAlbum($stateParams.id).then(function(response) {
      $scope.photos = response;
    })
  }

  $scope.getClientAlbum();

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
