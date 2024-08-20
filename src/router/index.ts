import { Router } from "express";
import { routes } from "./routes";

const router = Router();

routes.forEach((route) => {
  if (route.middleware) {
    router[route.method](route.path, route.middleware, route.controller);
  } else {
    router[route.method](route.path, route.controller);
  }
});

export default router;
