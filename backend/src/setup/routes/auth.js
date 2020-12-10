import passport from "passport";
import { Router } from "express";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/graphql",
    failureRedirect: "http://localhost:4000/graphql",
  })
);

export default authRouter;
