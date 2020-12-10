const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const session = require("express-session");
const session = require("cookie-session");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;

const setupPassport = (server, database) => {
  server.express.use(cookie("cats"));
  server.express.use(bodyParser.urlencoded({ extended: false }));
  server.express.use(
    // session({
    //   name: "google-auth-session",
    //   keys: ["key1", "key2"],
    //   saveUninitialized: true,
    // })

    session({
      name: "session",
      keys: ["key1", "key2"],
    })
  );
  server.express.use(passport.initialize());
  server.express.use(passport.session());

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

  passport.serializeUser((user, done) => {
    console.log("ser", user);
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("deser", user);
    // const user = await database.users.findOne({ _id: ObjectId(id) });
    // done(null, user);
    return done(null, { firstName: "Foo", lastName: "Bar" });
  });

  // passport.serializeUser(function (user, done) {

  //   console.log("Serialize", user);
  //   done(null, user);
  // });

  // passport.deserializeUser(function (user, done) {
  //   console.log("Deserialize", user);
  //   done(null, user);
  // });
};

module.exports = setupPassport;
