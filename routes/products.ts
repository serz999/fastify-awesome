import { FastifyInstance } from "fastify";

async function productsRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/api/products', async (request, reply) => {
        const data = { goods: 'some value' } 
        return data
    })

    fastify.post('/api/products', async (request, reply) => {
        // Some code
    })

    fastify.patch('/api/products',async (request, reply) => {
        // Some code
    })

    fastify.delete('/api/products',async (request, reply) => {
        // Some code
    })
}

export {productsRoute as goodsRoute}
