import { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";

export interface Isnippet extends Document {
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: [String],
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

SnippetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const getHelloWorld = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};
