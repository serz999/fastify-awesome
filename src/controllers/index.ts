import * as models from "../db/models";
import { BaseController } from "./BaseController";

export const productController = new BaseController(models.Product) 
export const userController = new BaseController(models.User) 
export const orderController = new BaseController(models.Order)