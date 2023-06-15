import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import { productsRoute } from './routes/products'
import { usersRoute } from './routes/users'
import { ordersRoute } from './routes/orders'

const fastify: FastifyInstance = Fastify({
    logger: false
})

const PORT: number = Number(process.env.PORT)!
const HOST: string = process.env.HOST!

fastify.register(productsRoute)
fastify.register(usersRoute)
fastify.register(ordersRoute)

const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: HOST })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()