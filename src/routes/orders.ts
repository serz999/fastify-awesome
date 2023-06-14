import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/orders";

async function ordersRoute(fastify: FastifyInstance, options: Object) {
    const orderController = new OrderController() 
    
    fastify.get('/api/orders', orderController.get)

    fastify.post('/api/orders', orderController.add)

    fastify.patch('/api/orders', orderController.update)

    fastify.delete('/api/orders', orderController.delete)
}

export { ordersRoute }