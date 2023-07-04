import * as models from "../db/models";
import { BaseController } from "./base/base.controller";


const productController = new BaseController(models.Product) 
const userController = new BaseController(models.User) 
const orderController = new BaseController(models.Order) 


export { productController, userController, orderController } 