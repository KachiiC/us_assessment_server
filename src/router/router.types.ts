import { NextFunction, Request, Response } from "express";

export interface IRouterRoute {
  method: "get" | "put" | "post";
  path: string;
  controller: (req: Request, res: Response) => void;
  middleware?: (req: Request, res: Response, next: NextFunction) => void;
}