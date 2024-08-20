import { Request, Response } from "express";
import FetchApi from "../services/fetch";
import { replaceRegionInUrl } from "../helpers/url.helpers";
import { serverCache } from "../cache/serverCache";
import { regionList } from "../data/serverList";

export const serverController = async (req: Request, res: Response) => {
  try {
    const { region } = req.params;
    const url = process.env.API_ENDPOINT || "";
    const serverUrl = replaceRegionInUrl(url, region);

    const responseData = await FetchApi(serverUrl);

    serverCache.set(region, responseData);

    res.send(responseData);
    res.status(200);
  } catch (error) {
    console.log("serverController error", error);
    res.send();
    res.status(500);
  }
};

export const allServers = async (req: Request, res: Response) => {
  try {
    const url = process.env.API_ENDPOINT || "";
    const responseData: { [x: string]: Object } = {};

    // Using for...of loop for async operations
    for (const region of regionList) {
      const serverUrl = replaceRegionInUrl(url, region);
      const data = await FetchApi(serverUrl);
      serverCache.set(region, data);
      responseData[region] = data; // Store the data per region
    }

    res.status(200).send(responseData);
  } catch (error) {
    console.error("serverController error", error);
    res.status(500).send();
  }
};
