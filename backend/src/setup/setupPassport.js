import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "cookie-session";
import { ObjectID } from "mongodb";

const setupPassport = (app, database) => {
  const googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
  };

  const googleCallback = async (accessToken, refreshToken, profile, done) => {
    const existedUser = await database.users.findOne({
      googleId: profile.id,
    });

    if (existedUser) {
      done(null, existedUser);
      return;
    }

    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails && profile.emails[0].value,
      image: profile.photos && profile.photos[0].value,
    };

    const user = await database.users.insertOne(newUser);

    done(null, user);
  };

  passport.use(new GoogleStrategy(googleOptions, googleCallback));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const matchingUser = await database.users.findOne({
      _id: ObjectID(id),
    });
    done(null, matchingUser);
  });

  app.use(
    session({
      name: process.env.SESSION_NAME,
      keys: ["key1", "key2"],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

export default setupPassport;
