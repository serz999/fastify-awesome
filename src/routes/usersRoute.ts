import { FastifyInstance } from "fastify";
import { userController } from "../controllers"

export async function usersRoute(fastify: FastifyInstance, options: Object) {
    
    fastify.get('/api/users', userController.getAll.bind(userController))

    fastify.get('/api/users/:id',  userController.getById.bind(userController))

    fastify.post('/api/users',  userController.add.bind(userController))

    fastify.patch('/api/users/:id', userController.update.bind(userController))

    fastify.delete('/api/users/:id', userController.delete.bind(userController))
}
