import { connect } from "./db";
import { start } from "./server";
import dotenv from "dotenv";

const bootstrap = async () => {
  dotenv.config();
  await connect();
  const server = start();
};

bootstrap();
