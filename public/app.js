angular.module("app", ['ui.router', 'ui.materialize'])
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {


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
    url: '/videos/:id',
    templateUrl: './views/videos.html',
    controller: 'videosCtrl'
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

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain. **.
    'https://s3-us-west-2.amazonaws.com/tyler-little-photography/**',
    'https://player.vimeo.com/video/**',
    'https://www.youtube.com/embed/**'
  ]);




})




.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
});
