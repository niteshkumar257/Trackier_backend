import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./db/config.js";
import userRouter from "./routes/user_routes.js";
import projectRouter from "./routes/project_routes.js";
import taskRouter from "./routes/task_routes.js";

dotenv.config();
// dotenv

const app = express();
const port = process.env.PORT || 8000;

// cors origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
  // all origins are allowed
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.status(200).json("Trackier Backend Routes");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("server Started", port);
    });
  })
  .catch((err) => {
    console.log("Server unable to connect with Db");
  });
