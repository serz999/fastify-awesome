import { Product } from '../db/models/all-models';
import { BaseController, HttpGetEmit } from './interfaces'
import { FastifyReply, FastifyRequest } from "fastify";

export class ProductController implements BaseController{
    
    constructor() {}

    async add(request: FastifyRequest, reply: FastifyReply): Promise<Object> { 
        const body: any = request.body!
        const createdProduct = await Product.create(body)
        return createdProduct.dataValues
    }

    async get(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const allProducts = await Product.findAll()
        const productsArray = new Array()
        for (const product of allProducts) {
            productsArray.push(product.dataValues)
        }

        const result: HttpGetEmit = {
            totalCount: productsArray.length,
            objects: productsArray
        }
        return result
    }

    async update(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const body: any = request.body!
        const product = await Product.findOne({ where: { email: body.name } })
        if (product) {
            await product.update(body)
            await product.save()
            return product.dataValues
        }
        else return {Error: `Product with name ${body.name} is not found`}
   }

    async delete(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const body: any = request.body!
        const product = await Product.findOne({ where: { email: body.name } })
        if (product) {
            await product.destroy()
            return {}
        }
        else return {Error: `Product with name ${body.name} is not found`}   
    }
}