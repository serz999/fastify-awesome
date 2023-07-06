import { productRevision } from "../db/models";
import { Product } from "../db/models";
import { BaseController } from "./BaseController";
import { ControllerWithVscSupport } from "./ControllerWithVscSupport"

export class ProductController extends ControllerWithVscSupport {
    protected Model = Product
    protected modelRevision = productRevision
}