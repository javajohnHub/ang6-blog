let express = require("express");
let bodyParser = require("body-parser");
let connectToDb = require("./db/connect");
let passport = require("passport");
let posts = require("./routes/posts.routes");
let user = require("./routes/user.routes");
let auth = require("./routes/auth.routes");
let User = require("./models/user");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;

const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(passport.initialize());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "ILovePokemon"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

server.use("/api", posts);
server.use("/auth", auth);
server.use("/user", passport.authenticate("jwt", { session: false }), user);
server.listen(process.env.PORT, () => {
  console.log("server started - 3005");
});
