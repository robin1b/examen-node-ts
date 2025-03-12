import { Router } from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} from "../controllers/snippetController";

const router = Router();

router.post("/snippets", createSnippet);
router.get("/snippets", getSnippets);
router.get("/snippets/:id", getSnippetById);
router.put("/snippets/:id", updateSnippet);
router.delete("/snippets/:id", deleteSnippet);

export default router;
