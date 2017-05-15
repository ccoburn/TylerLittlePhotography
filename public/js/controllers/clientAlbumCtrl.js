angular.module('app').controller('clientAlbumCtrl', function($scope, mediaService, $stateParams, signinService, $location) {




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
        // if (parseInt(user.album) !== parseInt($stateParams.id) && user.admin !== true) {
        //   $scope.redirect();
        // }
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true
        }
        if (user.album) {
          $scope.showYourAlbums = true;
        }

      } else {
        // $scope.redirect();
      $scope.user = '';
      $scope.username = false;
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
  $scope.getClientAlbum = function() {
   mediaService.getClientAlbum($stateParams.id).then(function(response) {
     $scope.photos = response;
   })
 }

 $scope.getClientAlbum();

  $scope.logout = function() {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  }

})
