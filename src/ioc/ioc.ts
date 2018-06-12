import { Container } from "inversify";
import { PingController } from "../controller/ping";
import { interfaces, TYPE } from "inversify-restify-utils";
import { UserService } from "../service/user";
import { TYPES } from "../constant/types";
import { UserController } from "../controller/user";
const container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(PingController).whenTargetNamed("PingController");
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed("UserController");
container.bind<UserService>(TYPES.UserService).to(UserService);
export default container;