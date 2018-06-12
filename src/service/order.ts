import { injectable } from "inversify";
import { Order } from "../model/order";
import { DatabaseProvider } from "../util/database";
import { User } from "../model/user";
import { Movie } from "../model/movie";
import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constant/types";


@provide(TYPES.OrderService)
export class OrderService {

    public async list(userId: number): Promise<Order[]> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Order).find({
            where: {
                user: userId
            }
        });
    }

    public async create(moviename: string, userId: number, order: Order): Promise<Order> {
        const connection = await DatabaseProvider.getConnection();
        const newOrder = new Order();
        newOrder.totalPrise = order.totalPrise;
        const user = await connection.getRepository(User).findOne(userId);
        const movie = await connection.getRepository(Movie).findOne({"name": moviename});
        if (!user || !movie) {
            return;
        }
        newOrder.user = user;
        newOrder.movie = movie;
        return await connection.getRepository(Order).findOne(newOrder);
    }

    public async getById(id: number): Promise<Order> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Order).findOne(id);
    }

    public async delete(id: number): Promise<Order> {
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(Order);
        const entity = await repository.findOne(id);
        return await repository.remove(entity);
    }
}