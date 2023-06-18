import { Product } from "../db/models";
import { BaseController } from "./base-controller";


class ProductController extends BaseController {}

export default new ProductController(Product)