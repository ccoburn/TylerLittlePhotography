const app = require('./index');
const db = app.get('db');

module.exports = {

    getMedia: function(req, res, next) {
      db.getMedia(function(err, media) {
        res.status(200).send(media)
      })
    },
    getPhotoSampleAlbums: function(req, res, next) {
      db.getPhotoSampleAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getSampleAlbum: function(req, res, next) {
      db.getSampleAlbum([req.params.id], function(err, photos) {
        res.status(200).send(photos)
      })
    },
    getClientAlbums: function(req, res, next) {
      db.getClientAlbums([req.params.id], function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getClientAlbum: function(req, res, next) {
      db.getClientAlbum([req.params.id], function(err, photos) {
        res.status(200).send(photos)
      })
    },
    getVideoSampleAlbums: function(req, res, next) {
      db.getVideoSampleAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getSampleVideos: function(req, res, next) {
      db.getSampleVideos([req.params.id], function(err, photos) {
        res.status(200).send(photos)
      })
    },
    getAllSampleAlbums: function(req, res, next) {
      db.getAllSampleAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getAllClientAlbums: function(req, res, next) {
      db.getAllClientAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    addAlbum: function(req, res, next) {
      console.log(req.body.name, req.body.date)
      db.addAlbum([req.body.name, req.body.date], function(err, added) {
        res.status(200).send(added)
      })
    }





}
