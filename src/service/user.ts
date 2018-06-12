import { User } from "../model/user";
import { DatabaseProvider } from "../util/database";
import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constant/types";


@provide(TYPES.UserService)
export class UserService {

  public async create(user: User): Promise<User> {
    const newUser = new User();
    // newUser.firstName = user.firstName;
    // newUser.lastName = user.lastName;
    // newUser.age = user.age;

    newUser.username = user.username;

    const connection = await DatabaseProvider.getConnection();
    return await connection.getRepository(User).save(newUser);
  }

  public async list(): Promise<User[]> {
    const connection  =  await DatabaseProvider.getConnection();
    return await connection.getRepository(User).find({relations: ["orders", "orders.movie"]});
  }


  public async getById(id: number): Promise<User> {
    const connection  =  await DatabaseProvider.getConnection();
    return await connection.getRepository(User).findOne(id, {relations: ["orders", "orders.movie"]});
  }

  public async update(user: User): Promise<User> {
    const connection = await DatabaseProvider.getConnection();
    const repository = connection.getRepository(User);
    const entity = await repository.findOne(user.id);
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.age = user.age;
    return await repository.save(entity);
  }

  public async delete(id: number): Promise<User> {
    const connection = await DatabaseProvider.getConnection();
    const repository = connection.getRepository(User);
    const entity = await repository.findOne(id);
    return await connection.getRepository(User).remove(entity);
  }
}
