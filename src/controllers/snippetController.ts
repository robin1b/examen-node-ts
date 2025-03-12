import { Request, Response } from "express";
import mongoose from "mongoose";

export interface Isnippet extends Document {
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
export const getHelloWorld = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};
