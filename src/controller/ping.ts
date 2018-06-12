import { Request, Response, Next } from "restify";
import { Controller, interfaces, Get } from "inversify-restify-utils";
import { injectable, inject } from "inversify";

@Controller("/ping")
@injectable()
export class PingController implements interfaces.Controller {
    @Get("/")
    private index(req: Request, res: Response): void {
        res.send(200, "hello visitor");
    }
}