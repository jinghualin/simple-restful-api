import { ServerBase } from "./server-base";
import { InversifyRestifyServer } from "inversify-restify-utils";
import { container } from "../ioc/ioc";
import * as restify from "restify";
import { DatabaseProvider } from "../util/database";

export class ServerLocal extends ServerBase {
  bootstrap(): restify.Server {
    super.bootstrap();
    this.app = new InversifyRestifyServer(container, {
      name: "Simple Restful API Server",
      version: "1.0.0"
    })
      .setConfig(app => {
        DatabaseProvider.configure({
          type: "postgres",
          database: "moviestore",
          username: "test",
          password: "test",
          host: "localhost",
          port: 5432
        });
        this.config(app);
        this.listen(app);
      })
      .build();
    return this.app;
  }
}
