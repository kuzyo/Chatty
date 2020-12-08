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
      res.redirect("/");
    }
  );
};

module.exports = setupRoutes;
