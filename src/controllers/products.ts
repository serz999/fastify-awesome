import { Product } from "../db/models/all-models";
import { BaseController } from "./base-controller";


class ProductController extends BaseController {}

export default new ProductController(Product)