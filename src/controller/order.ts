import { Controller, interfaces, Get, Post, Put, Delete, TYPE } from "inversify-restify-utils";
import { injectable, inject } from "inversify";
import { OrderService } from "../service/order";
import { Request, Response, Next } from "restify";
import { TYPES } from "../constant/types";

@Controller("/user/:id")
@injectable()
export class OrderController implements interfaces.Controller {
    constructor( @inject(TYPES.OrderService) private orderService: OrderService) {}

    @Get("/order/:oid")
    private async getOrder(req: Request, res: Response): Promise<void> {
        const order = await this.orderService.getById(req.params.oid);
        res.send(order ? 200 : 404, order);
    }

    @Post("/order")
    private async create(req: Request, res: Response ): Promise<void> {
        res.send(await this.orderService.create(req.query.moviename, req.params.id, req.body));
    }

    @Get("/orders")
    private async list( req: Request, res: Response ): Promise<void> {
        res.send(await this.orderService.list(req.params.id));
    }

    @Delete("/order/:oid")
    private async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.orderService.delete(req.params.oid);
            res.send(200);
        }
        catch (err) {
            res.send(500);
        }
    }
}