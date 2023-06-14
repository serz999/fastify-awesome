import { FastifyInstance } from "fastify";
import { UserController } from '../controllers/users'
import { userValidateSchema } from "../schemas/users";


async function usersRoute(fastify: FastifyInstance, options: Object) {
    const userController = new UserController()

    fastify.get('/api/users', userController.get)

    fastify.post('/api/users', userValidateSchema, userController.add)

    fastify.patch('/api/users', userController.update)

    fastify.delete('/api/users', userController.delete)
}

export { usersRoute }