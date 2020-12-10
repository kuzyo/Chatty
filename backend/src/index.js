import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { v4 as uuid } from "uuid";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";
import User from "./User";
import GoogleStrategy from "passport-google-oauth20";
import { typeDefs, Query, Mutation } from "./graphql";
dotenv.config();

// const database = await setupDatabase();

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/google/callback",
};

const googleCallback = async (accessToken, refreshToken, profile, done) => {
  const users = User.getUsers();
  const matchingUser = users.find((user) => user.facebookId === profile.id);

  if (matchingUser) {
    done(null, matchingUser);
    return;
  }

  const newUser = {
    id: uuid(),
    facebookId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails && profile.emails[0] && profile.emails[0].value,
  };
  users.push(newUser);
  done(null, newUser);

  // const existedUser = await database.users.findOne({
  //   googleId: profile.id,
  // });

  // if (existedUser) {
  //   done(null, existedUser);
  //   return;
  // }

  // const newUser = {
  //   googleId: profile.id,
  //   name: profile.displayName,
  //   image: (profile.photos && profile.photos[0].value) || "",
  // };

  // const user = await database.users.insertOne(newUser);

  // done(null, user);
};

passport.use(new GoogleStrategy(googleOptions, googleCallback));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = User.getUsers();
  const matchingUser = users.find((user) => user.id === id);
  done(null, matchingUser);
});

const app = express();

// passport.serializeUser((user, done) => {
//   done(null, user.googleId);
// });

// passport.deserializeUser(async (id, done) => {
//   const matchingUser = await database.users.findOne({
//     googleId: id,
//   });
//   done(null, matchingUser);
// });

app.use(
  session({
    genid: (req) => uuid(),
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/graphql",
    failureRedirect: "http://localhost:4000/graphql",
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: ({ req }) => ({
    getUser: () => req.user,
    logout: () => req.logout(),
  }),
  playground: { settings: { "request.credentials": "same-origin" } },
});
//   setupPassport(server, database);
//   setupRoutes(server);
// server.start(({ port }) => {
//   console.log(`Server is listening on port ${port}`);
// });
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
