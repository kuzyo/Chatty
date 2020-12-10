import authRouter from "./routes/auth";

const setupRoutes = (app) => {
  app.use("/auth", authRouter);
};

export default setupRoutes;
