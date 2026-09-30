import express from "express";
import { startAttempt } from "../Controller/attempt.Controller.js";
import { saveAnswer, submitAttempt } from "../Controller/attempt.Controller.js";
import { verifyJWT } from "../Middleware/verifyJWT.js";

const attemptRouter = express.Router();

attemptRouter.post("/attempt/create", verifyJWT, startAttempt);

attemptRouter.patch("/attempt/:attemptId/answer", verifyJWT, saveAnswer);

attemptRouter.post("/attempt/:attemptId/submit", verifyJWT, submitAttempt);

export default attemptRouter;
