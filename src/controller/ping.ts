import { Request, Response, Next } from "restify";
import { Controller, interfaces, Get, TYPE } from "inversify-restify-utils";
import { injectable } from "inversify";
import { provide } from "inversify-binding-decorators";

@Controller("/ping/:id")
@injectable()
export class PingController implements interfaces.Controller {
  @Get("/")
  private index(req: Request, res: Response): void {
    res.send(200, "hello visitor" + req.params.id);
  }
}
