const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const JsonDB = require("node-json-db");
const db = new JsonDB("myDataBase", true, true);
const app = express();
const cors = require("cors")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  // console.log(JSON.stringify(req.headers));
  if (req.headers.authorization && req.headers.authorization.length > 0)
    console.log(req.headers.authorization.split(" ")[1]);
  next();
});

app.use(passport.initialize());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      const users = db.getData("/item");
      const user = Object.values(users).find(
        (u) => email === u.email && password === u.password
      );
      console.log("local", email, password, user);
      if (user)
        done(null, { email: user.email, displayName: user.displayName });
      else done(null, false);
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "mon_secret",
    },
    function (payload, done) {
      if (payload) done(null, payload);
      else done(null, false);
    }
  )
);

app.post(
  "/auth/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    console.log("signin", req.user);
    const token = jwt.sign(req.user, "mon_secret")
    res.json(token);
  }
);

app.get(
  "/hellome",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user)
    res.send("hello " + req.user.displayName);
  }
);

// app.use("/", require("./routes"));

/// Error 404
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + server.address().port);
});
