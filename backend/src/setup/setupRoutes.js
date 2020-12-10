const passport = require("passport");

const setupRoutes = (server) => {
  server.express.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  server.express.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      console.log("User in request", req.user);
      res.redirect("/");
    }
  );
};

module.exports = setupRoutes;
