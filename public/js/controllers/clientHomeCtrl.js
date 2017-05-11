angular.module('app').controller('clientHomeCtrl', function($scope, mediaService, $stateParams, signinService, $location) {


  $scope.redirect = function() {
      $location.path('home').then($scope.alert());
  }

  $scope.alert = function() {
    setTimeout(function(){ alert("Not Authorized"); }, 500);
  }


  function getUser() {
    signinService.getUser().then(function(user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        // if (parseInt(user.id) !== parseInt($stateParams.id) && user.admin !== true) {
        //   $scope.redirect();
        // }
        if (user.admin === true) {
          $scope.showAdmin = true
        }
        if (user.album) {
          $scope.showYourAlbums = true;
        }

      } else {
      // $scope.redirect();
      $scope.user = 'NOT LOGGED IN';
      $scope.showLogout = false;
      $scope.hideSignin = false;
      $scope.showAdmin = false;
      $scope.showYourAlbums = false;
    }
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

  $scope.logout = function() {
    signinService.logout();
    $scope.user = 'NOT LOGGED IN';
    $scope.showLogout = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  }


$scope.getClientAlbums = function() {
  mediaService.getClientAlbums($stateParams.id).then(function(response) {
    $scope.albums = response;
    console.log($scope.albums);
  })
}

$scope.getClientAlbums();



})
