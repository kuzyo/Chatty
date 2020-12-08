const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");

const setupPassport = (server, database) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const existedUser = await database.users.findOne({
          googleId: profile.id,
        });

        if (existedUser) {
          return done(null, existedUser);
        }

        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          image: (profile.photos && profile.photos[0].value) || "",
        };

        const user = await database.users.insertOne(newUser);

        return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log("Serialize", user);
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    console.log("Deserialize", user);
    done(null, user);
  });

  server.express.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: "cats",
      name: "google-auth-session",
      keys: ["key1", "key2"],
    })
  );
  server.express.use(bodyParser.urlencoded({ extended: false }));
  server.express.use(passport.initialize());
  server.express.use(passport.session());
};

module.exports = setupPassport;
