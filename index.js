const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session')
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./config');

var conn = massive.connectSync({
  connectionString : "postgres://postgres:" + config.postgresPass + "@localhost/tyler_little"
});



// App definition
const app = module.exports = express();

// Middleware
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: config.sessionSecret
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(cors());

// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Controllers
app.set('db', conn);
const db = app.get('db');

const serverCtrl = require('./serverCtrl');

passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function(err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile.displayName, profile.id], function(err, user) {
          console.log('USER CREATED', user);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  var userC = userB;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));


//////////////////////////////////////////////////////

// API
// get media
app.get('/api/allMedia', serverCtrl.getMedia)
// get SampleAlbums by type for photos view
app.get('/api/SamplePhotos', serverCtrl.getPhotoSampleAlbums)
// get media by SampleAlbums id for photo album view
app.get('/api/SamplePhotoAlbum/:id', serverCtrl.getSampleAlbum)
// get ClientAlbums by Client by client albums view
app.get('/api/ClientAlbums/:id', serverCtrl.getClientAlbums)
// get media by Client Album for photo album view
app.get('/api/ClientAlbum/:id', serverCtrl.getClientAlbum)
// get SampleAlbums by type for videos view
app.get('/api/SampleVideos', serverCtrl.getVideoSampleAlbums)
// get media by SampleAlbums id for video album view
app.get('/api/SampleVideoAlbum/:id', serverCtrl.getSampleVideos)
// get albums list of names and rename name columns
app.get('/api/SampleAlbums', serverCtrl.getAllSampleAlbums)
app.get('/api/AllClientAlbums', serverCtrl.getAllClientAlbums)
// post to insert complete row in client album
app.post('/api/AddAlbum', serverCtrl.addAlbum)
// get user names and post to update users id to client album
app.get('/api/UserNames', serverCtrl.getUserNames)
app.post('/api/addUserToAlbum', serverCtrl.addUserToAlbum)
// post to insert media and integrate with S3
app.post('/api/uploadImage', serverCtrl.uploadImage)
app.post('/api/addMedia', serverCtrl.addMedia)
// auth endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})


// Connections
var portNum = 5350;


app.listen(portNum, function () {
    console.log('Welcome to port:', portNum);
});
