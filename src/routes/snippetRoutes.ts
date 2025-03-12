import express from "express";
import { getHelloWorld } from "../controllers/snippetController";

const router = express.Router();

router.get("/test", getHelloWorld);

export default router;
