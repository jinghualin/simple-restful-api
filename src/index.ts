import "reflect-metadata";
import { ServerLocal } from "./server/server-local";
const server = new ServerLocal();
server.bootstrap();