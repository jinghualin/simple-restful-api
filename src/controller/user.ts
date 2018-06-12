import { Controller, interfaces, Get } from "inversify-restify-utils";
import { injectable, inject } from "inversify";
import { UserService } from "../service/user";
import { Request, Response, Next } from "restify";
import { TYPES } from "../constant/types";


@Controller("/users")
@injectable()
export class UserController implements interfaces.Controller {
    constructor( @inject(TYPES.UserService) private userService: UserService) {}

    @Get("/:name")
    private getUser(req: Request, res: Response): void {
        res.send(200, this.userService.test(req.params.name));
    }
}