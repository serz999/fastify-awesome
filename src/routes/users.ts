import { FastifyInstance } from "fastify";
import { userController } from "../controllers"
import { getAllSchema, getByIdSchema, postSchema } from '../schemas/users'


async function usersRoute(fastify: FastifyInstance, options: Object) {
    
    fastify.get('/api/users', getAllSchema, userController.getAll.bind(userController))

    fastify.get('/api/users/:id', getByIdSchema, userController.getById.bind(userController))

    fastify.post('/api/users', postSchema, userController.add.bind(userController))

    fastify.patch('/api/users/:id', userController.update.bind(userController))

    fastify.delete('/api/users/:id', userController.delete.bind(userController))
}

export { usersRoute }