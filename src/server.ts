import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import snippetRoutes from "./routes/snippetRoutes";
import Snippet, { ISnippet } from "./models/Snippet";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI!);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/api", snippetRoutes);

app.get("/", async (_, res) => {
  const snippets = (await Snippet.find().lean()) as ISnippet[];

  snippets.forEach((snippet: ISnippet) => {
    snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
  });

  res.render("index", { snippets });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
