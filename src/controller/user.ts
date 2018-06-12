import { Controller, interfaces, Get, Post, Put, Delete } from "inversify-restify-utils";
import { injectable, inject } from "inversify";
import { UserService } from "../service/user";
import { Request, Response, Next } from "restify";
import { TYPES } from "../constant/types";


@Controller("/users")
@injectable()
export class UserController implements interfaces.Controller {
    constructor( @inject(TYPES.UserService) private userService: UserService) {}

    @Get("/:id")
    private async getUser(req: Request, res: Response): Promise<void> {
        const user = await this.userService.getUser(req.params.id);
        res.send(user ? 200 : 404, user);
    }

    @Post("/")
    private async create(req: Request, res: Response ): Promise<void> {
        res.send(await this.userService.create(req.body));
    }

    @Get("/")
    private async list( req: Request, res: Response ): Promise<void> {
        res.send(await this.userService.list());
    }

    @Put("/:id")
    private async update(req: Request, res: Response): Promise<void> {
        res.send(await this.userService.update({...req.body, id: req.params.id}));
    }

    @Delete("/:id")
    private async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.userService.delete(req.params.id);
            res.send(200);
        }
        catch (err) {
            res.send(500);
        }
    }
}