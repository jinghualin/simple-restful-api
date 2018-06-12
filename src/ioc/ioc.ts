import { Container } from "inversify";
import { buildProviderModule, fluentProvide } from "inversify-binding-decorators";
import { PingController } from "../controller/ping";
import { interfaces, TYPE } from "inversify-restify-utils";
import { OrderController } from "../controller/order";
import { UserController } from "../controller/user";

const container = new Container();
container.bind<interfaces.Controller>(TYPE.Controller).to(PingController).whenTargetNamed("PingController");
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed("UserController");
container.bind<interfaces.Controller>(TYPE.Controller).to(OrderController).whenTargetNamed("OrderController");
container.load(buildProviderModule());
export  { container };