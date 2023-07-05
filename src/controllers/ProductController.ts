import { Product } from "../db/models";
import { BaseController } from "./BaseController";

export class ProductController extends BaseController {
    protected Model = Product      
}