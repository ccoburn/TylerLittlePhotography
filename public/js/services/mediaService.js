angular.module('app').service('mediaService', function($http) {

  this.getMedia = function() {
    return $http.get('http://localhost:5350/api/allMedia').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getPhotoSampleAlbums = function() {
    return $http.get('http://localhost:5350/api/SamplePhotos').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getSampleAlbum = function(id) {
    return $http.get('http://localhost:5350/api/SamplePhotoAlbum/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getClientAlbums = function(id) {
    return $http.get('http://localhost:5350/api/ClientAlbums/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getClientAlbum = function(id) {
    return $http.get('http://localhost:5350/api/ClientAlbum/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getVideoSampleAlbums = function() {
    return $http.get('http://localhost:5350/api/SampleVideos').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getSampleVideos = function(id) {
    return $http.get('http://localhost:5350/api/SampleVideoAlbum/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getAllSampleAlbums = function() {
    return $http.get('http://localhost:5350/api/SampleAlbums').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getAllClientAlbums = function() {
    return $http.get('http://localhost:5350/api/AllClientAlbums').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.addAlbum = function(album) {
    return $http.post('http://localhost:5350/api/AddAlbum', {name: album.name, date: album.date}).then(function(response) {
      console.log(album);
      return response;
    })
  }


})
