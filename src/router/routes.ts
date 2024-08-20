import { allServerCacheMiddleware, serverCacheMiddleware } from "../cache/serverCache";
import { allServers, serverController } from "../controllers/serverController";
import { IRouterRoute } from "./router.types";

export const routes: IRouterRoute[] = [
  {
    method: "get",
    path: "/server/:region",
    controller: serverController,
    middleware: serverCacheMiddleware
  },
  {
    method: "get",
    path: "/all",
    controller: allServers,
    middleware: allServerCacheMiddleware
  },
];
