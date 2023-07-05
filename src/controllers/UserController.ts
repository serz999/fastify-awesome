import { User } from "../db/models";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
    protected Model = User      
}