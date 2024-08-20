import { NextFunction, Request, Response } from "express";
import Cache from "node-cache";
import { regionList } from "../data/serverList";

export const serverCache = new Cache({ stdTTL: 60 * 2 });

export const allServerCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hasAllRegions = regionList.every((region) => serverCache.has(region));

    if (hasAllRegions) {
      console.log("cache fetch");
      const allRegionsRes: { [x: string]: any } = {};

      regionList.forEach((region) => {
        allRegionsRes[region] = serverCache.get(region);
      });

      res.send(allRegionsRes);
      res.status(200);

      return;
    }
    return next();
  } catch (err) {
    console.log('allServerCacheMiddleware error', err);
    throw err;
  }
};
export const serverCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const region = req.params.region;

    if (serverCache.has(region)) {
      console.log("cache fetch");
      res.send(serverCache.get(region));
      res.status(200);

      return;
    }
    return next();
  } catch (err) {
    console.log("serverCacheMiddleware error", err);
    throw err;
  }
};
