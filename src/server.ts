import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import snippetRoutes from "./routes/snippetRoutes";
import Snippet, { ISnippet } from "./models/Snippet";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/api", snippetRoutes);

app.get("/", async (_, res) => {
  try {
    const snippets = await Snippet.find().lean();
    console.log("Fetched Snippets:", snippets); // Debugging output
    snippets.forEach((snippet) => {
      snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
    });
    res.render("index", { snippets });
  } catch (error) {
    console.error("❌ Error fetching snippets:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
