import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import { productsRoute, usersRoute, ordersRoute } from './routes'
const PORT: number = Number(process.env.PORT)!
const HOST: string = process.env.HOST!

const fastify: FastifyInstance = Fastify({
    logger: process.env.LOGGER === 'true'
})

fastify.register(productsRoute)
fastify.register(usersRoute)
fastify.register(ordersRoute)

const run = async () => {
    try {
        await fastify.listen({ port: PORT, host: HOST })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

run()