import { Order } from "../db/models/all-models";
import { BaseController } from "./base-controller";


class OrderController extends BaseController {}

export default new OrderController(Order)