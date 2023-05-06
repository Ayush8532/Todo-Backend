import express from "express";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
  path: "./data/.env",
}),
  //using middleware
  app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("hey");
});

app.use(errorMiddleware);
