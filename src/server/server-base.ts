import * as corsMiddleware from "restify-cors-middleware";
import * as restify from "restify";
import * as morgan from "morgan";
import * as helmet from "helmet";

export class ServerBase {
  public app: restify.Server;

  constructor() {}

  bootstrap() {}

  protected listen(app) {
    app.listen(this.getPort(), this.getHost(), () => {
      console.log(`${app.name} listening at ${app.url}`);
    });
  }

  protected database() {}

  protected config(app) {
    const cors = corsMiddleware({
      preflightMaxAge: 5,
      origins: ["*"],
      allowHeaders: ["API-TOKEN"],
      exposeHeaders: ["API-TOKEN-EXPIRY"]
    });
    app.pre(cors.preflight);
    app.use(cors.actual);
    app.use(restify.plugins.bodyParser());
    app.use(restify.plugins.queryParser());
    app.use(restify.plugins.acceptParser(app.acceptable));
    app.use(restify.plugins.authorizationParser());
    app.use(restify.pre.userAgentConnection());
    app.use(morgan("dev"));
    app.use(helmet());

    // process exceptions
    app.on("uncaughtException", function(request, response, route, error) {
      console.error(error.stack);
      response.send(error);
    });
  }


  /**
   * get port from env or config.json
   * @returns {number}
   */
  getPort(): number {
    return ServerBase.normalizePort(process.env.PORT || 3000);
  }

  /**
   * get host from env or config.json
   * @returns {string}
   */
  getHost(): string {
    return process.env.HOST || "localhost";
  }

  /**
   * validate port
   * @param val
   * @returns {number}
   */
  static normalizePort(val): number {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    throw "Invalid port";
  }

}
