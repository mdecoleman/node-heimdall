import { initAuth } from "./auth";
import { initSession } from "./session";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import oauth2Routes from "./routes/oauth2Routes";
import ssoRoutes from "./routes/ssoRoutes";
import userRoutes from "./routes/userRoutes";

export function start() {
  const server = express();

  const port = process.env.PORT || 3001;
  const domain = process.env.DOMAIN;

  initSession(server);

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(helmet());
  server.use(cors());

  initAuth(server);

  server.use(ssoRoutes());
  server.use(userRoutes());
  server.use(oauth2Routes());

  server.listen(port, () => {
    console.info(`listening on http://${domain}:${port}`);
  });

  return server;
}
