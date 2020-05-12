import { Request, Response } from "express";
import { errorReport } from "./repository/wes";
import { cel } from './cel';

export const rootHandler = (_req: Request, res: Response) => {
  return res.send("API is working 🤓");
};

export const celHandler = async (_req: Request, res: Response) => {
  const data = await errorReport(10);
  res.json(cel(data["runs"]));
};
