import { FastifyInstance } from "fastify";
import { UserController } from '../controllers/users'

const userValidateSchema = {
    schema:{
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                firstName: { type: 'string' },
                secondName: { type: 'string' },
                age: { type: 'number' }
            },
            required: ['firstName']
        }
    }
}

const userSerializeSchema = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    firstName: { type: 'string' },
                    secondName: { type: 'string' },
                    age: { type: 'number' } 
                }
            }
        }
    }
} 

async function usersRoute(fastify: FastifyInstance, options: Object) {
    const userController = new UserController()

    fastify.get('/api/users', async (request, reply) => {
        const users = await userController.getAllUsers() 
        return users
    })

    fastify.post('/api/users', userValidateSchema, async (request, reply) => {
        const created_user = await userController.createUser(request.body!)
        return created_user.dataValues
    })

    fastify.patch('/api/users',async (request, reply) => {
        // Some code
    })

    fastify.delete('/api/users',async (request, reply) => {
        // Some code
    })
}

export { usersRoute }