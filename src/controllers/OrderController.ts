import { Order } from "../db/models";
import { BaseController } from "./BaseController";

export class OrderController extends BaseController {
    protected Model = Order      
}