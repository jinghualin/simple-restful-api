import { Controller, interfaces, Get, Post, Put, Delete, TYPE } from "inversify-restify-utils";
import { injectable, inject } from "inversify";
import { MovieService } from "../service/movie";
import { Request, Response, Next } from "restify";
import { TYPES } from "../constant/types";

@Controller("/")
@injectable()
export class MovieController implements interfaces.Controller {
    constructor( @inject(TYPES.MovieService) private movieService: MovieService) {}

    @Get("/movie/:id")
    private async getOrder(req: Request, res: Response): Promise<void> {
        const movie = await this.movieService.getById(req.params.oid);
        res.send(movie ? 200 : 404, movie);
    }

    @Post("/movie")
    private async create(req: Request, res: Response ): Promise<void> {
        res.send(await this.movieService.create(req.body));
    }

    @Get("/movies")
    private async list( req: Request, res: Response ): Promise<void> {
        res.send(await this.movieService.list());
    }

    @Delete("/movie/:id")
    private async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.movieService.delete(req.params.id);
            res.send(200);
        }
        catch (err) {
            res.send(500);
        }
    }
}