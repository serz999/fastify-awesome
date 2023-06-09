import { FastifyInstance } from "fastify";

async function ordersRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/api/orders', async (request, reply) => {
        const data = { orders: 'some value' } 
        return data
    })

    fastify.post('/api/orders', async (request, reply) => {
        // Some code
    })

    fastify.patch('/api/orders',async (request, reply) => {
        // Some code
    })

    fastify.delete('/api/orders',async (request, reply) => {
        // Some code
    })
}

export {ordersRoute}