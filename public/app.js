angular.module("app", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: './views/home.html',
    controller: 'mainCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: './views/about.html',
    controller: 'aboutCtrl'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: './views/contact.html',
    controller: 'contactCtrl'
  })
  .state('photos', {
    url: '/photos',
    templateUrl: './views/photos.html',
    controller: 'photosCtrl'
  })
  .state('photoAlbum', {
    url: '/photoAlbum/:id',
    templateUrl: './views/photoAlbum.html',
    controller: 'photoAlbumCtrl'
  })
  .state('videos', {
    url: '/videos',
    templateUrl: './views/videos.html',
    controller: 'videosCtrl'
  })
  .state('videoAlbum', {
    url: '/videoAlbum/:id',
    templateUrl: './views/videoAlbum.html',
    controller: 'videoAlbumCtrl'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: './views/signin.html',
    controller: 'signinCtrl'
  })
  .state('clientHome', {
    url: '/clientHome/:id',
    templateUrl: './views/clientHome.html',
    controller: 'clientHomeCtrl'
  })
  .state('clientAlbum', {
    url: '/clientAlbum/:id',
    templateUrl: './views/clientAlbum.html',
    controller: 'clientAlbumCtrl'
  })
  .state('adminHome', {
    url: '/adminHome',
    templateUrl: './views/adminHome.html',
    controller: 'adminHomeCtrl'
  })




})




.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
});
