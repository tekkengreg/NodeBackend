const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use((req, res, next) => {
  // console.log(JSON.stringify(req.headers));
  console.log(req.headers.authorization.split(' ')[1])
    next()
})

app.use(passport.initialize());

const userFake = {
  email: 'wild@wild.fr',
  password: 'wilder'
}
passport.use(new LocalStrategy({
  usernameField: 'email',
},
  function (email, password, done) {
    console.log('local', email, password)
    if (email === userFake.email
      && password === userFake.password)
      done(null, { email: userFake.email })
    else
      done(null, false)
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'mon_secret'
},
  function (payload, done) {
    if (payload) done(null, payload)
    else done(null, false)
  })
)

app.post('/auth/signin', passport.authenticate('local', { session: false }), 
(req, res) => {
  console.log("signin", req.user)
  res.json(jwt.sign(req.user, 'mon_secret'))
})

app.get('/hellome', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('hello ' + req.user.email)
  }
)

//app.use('/', require('./routes'));



/// Error 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


let server = app.listen(process.env.PORT || 5000, function () {
  console.log('Listening on port ' + server.address().port);
});
