import { FastifyInstance } from "fastify";

async function usersRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/api/users', async (request, reply) => {
        const data = { users: 'some value' } 
        return data
    })

    fastify.post('/api/users', async (request, reply) => {
        // Some code
    })

    fastify.patch('/api/users',async (request, reply) => {
        // Some code
    })

    fastify.delete('/app/users',async (request, reply) => {
        // Some code
    })
}

export {usersRoute}