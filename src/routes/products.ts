import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/products";

async function productsRoute(fastify: FastifyInstance, options: Object) {
    const productController = new ProductController() 

    fastify.get('/api/products', productController.get)

    fastify.post('/api/products', productController.add)

    fastify.patch('/api/products', productController.update)

    fastify.delete('/api/products', productController.delete)
}

export { productsRoute }
