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

  this.getSampleVideos = function() {
    return $http.get('http://localhost:5350/api/SampleVideos').then(function(response) {
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

  this.storeImage = function (imageData, fileName, type, clientId, sampleId) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      type: type,
      clientId: clientId,
      sampleId: sampleId
    }

    return $http.post('http://localhost:5350/api/uploadImage', newImage)
  }

  this.getUserNames = function() {
    return $http.get('http://localhost:5350/api/UserNames').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.addUserToAlbum = function(userid, albumid) {
    return $http.post('http://localhost:5350/api/addUserToAlbum', {userid: userid, albumid: albumid})
  }


})
