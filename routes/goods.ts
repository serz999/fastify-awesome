import { FastifyInstance } from "fastify";

async function goodsRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/api/goods', async (request, reply) => {
        const data = { goods: 'some value' } 
        return data
    })

    fastify.post('/api/goods', async (request, reply) => {
        // Some code
    })

    fastify.patch('/api/goods',async (request, reply) => {
        // Some code
    })

    fastify.delete('/app/goods',async (request, reply) => {
        // Some code
    })
}

export {goodsRoute}
