import { Request, Response } from "express";
import Snippet from "../models/Snippet";

export const createSnippet = async (req: Request, res: Response) => {
  const { title, code, language, tags, expiresIn } = req.body;
  const encodedCode = Buffer.from(code).toString("base64");

  const snippet = await Snippet.create({
    title,
    code: encodedCode,
    language,
    tags,
    expiresAt: expiresIn ? new Date(Date.now() + expiresIn * 1000) : null,
  });

  res.status(201).json(snippet);
};

export const getSnippets = async (req: Request, res: Response) => {
  const {
    language,
    tags,
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
  } = req.query;

  const filter: any = { expiresAt: { $gt: new Date() } };
  if (language) filter.language = new RegExp(`^${language}$`, "i");
  if (tags) filter.tags = { $in: tags.toString().split(",") };

  const snippets = await Snippet.find(filter)
    .sort({ [sort.toString()]: order === "desc" ? -1 : 1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);

  snippets.forEach(
    (s) => (s.code = Buffer.from(s.code, "base64").toString("utf-8"))
  );

  res.json(snippets);
};

export const getSnippetById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const snippet = await Snippet.findById(req.params.id);
  if (!snippet || (snippet.expiresAt && snippet.expiresAt < new Date())) {
    res.status(404).json({ message: "Snippet not found or expired" });
    return;
  }

  snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
  res.json(snippet);
};

export const updateSnippet = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, code, language, tags } = req.body;

  const snippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    { title, code: Buffer.from(code).toString("base64"), language, tags },
    { new: true }
  );

  if (!snippet) {
    res.status(404).json({ message: "Snippet not found" });
    return;
  }

  res.json(snippet);
};

export const deleteSnippet = async (req: Request, res: Response) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
