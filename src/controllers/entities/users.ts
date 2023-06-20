import { User } from "../../db/models";
import { BaseController } from "../base-controller";


class UserController extends BaseController {}

export default new UserController(User) 