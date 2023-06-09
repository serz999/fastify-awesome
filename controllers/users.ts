import { Sequelize } from "sequelize";
import { User } from '../models/models-example';


class UserController {

    constructor() {}
    
    public async getAllUsers() {
        const allUsers = await User.findAll()
        const users_array = new Array()
        for (const user of allUsers) {
            users_array.push(user.dataValues)
        }
        const result = {
            count: users_array.length,
            users: users_array
        }
        return result
    }

    public async createUser(user: Object) {
        const created_user = await User.create()
        return created_user
    }
}

export { UserController }