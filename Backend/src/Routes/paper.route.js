import express from "express";
import {
  createPaper,
  getAllPapers,
  getSinglePaper,
} from "../Controller/paper.controller.js";
import { verifyJWT } from "../Middleware/verifyJWT.js";
import { isAdmin } from "../Middleware/isAdmin.js";

const paperRouter = express.Router();

paperRouter.post("/create/paper", verifyJWT, isAdmin, createPaper);

paperRouter.get("/read/paper", verifyJWT, getAllPapers);

paperRouter.get("/read/paper/:id", verifyJWT, getSinglePaper);

export default paperRouter;
