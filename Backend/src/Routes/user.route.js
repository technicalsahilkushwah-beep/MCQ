import express from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../Controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/signin", loginUser);

userRouter.post("/refreshToken", refreshAccessToken);

userRouter.post("/logout", logoutUser);

export default userRouter;
