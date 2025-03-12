import express from "express";
import {
  createSnippet,
  getSnippetById,
  deleteSnippet,
} from "../controllers/snippetController";
const router = express.Router();

router.post("/snippets", createSnippet);
router.get("/snippets/:id", getSnippetById);
router.delete("/snippets/:id", deleteSnippet);

export default router;
