import { injectable } from "inversify";
import { User } from "../model/user";

@injectable()
export class UserService {
  // public async list(): Promise<User> {
  //   return 
  // }
  public test(name: string): string {
    return "hello " + name;
  }
}
