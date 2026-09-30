import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import paperRouter from "./Routes/paper.route.js";
import attemptRouter from "./Routes/attempt.route.js";
import userRouter from "./Routes/user.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// ==== Api_Routes =========================
app.use("/api", paperRouter);
app.use("/api", attemptRouter);
app.use("/api", userRouter);

export default app;
