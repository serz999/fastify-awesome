import { Order } from "../../db/models";
import { BaseController } from "../base-controller";


class OrderController extends BaseController {}

export default new OrderController(Order)