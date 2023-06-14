import { Order } from '../db/models/all-models';
import { BaseController, HttpGetEmit } from './interfaces'
import { FastifyReply, FastifyRequest } from "fastify";

export class OrderController implements BaseController{
    
    constructor() {}

    async add(request: FastifyRequest, reply: FastifyReply): Promise<Object> { 
        const body: any = request.body!
        const createdOrder = await Order.create(body)
        return createdOrder.dataValues
    }

    async get(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const allOrder = await Order.findAll()
        const orderArray = new Array()
        for (const order of allOrder) {
            orderArray.push(order.dataValues)
        }

        const result: HttpGetEmit = {
            totalCount: orderArray.length,
            objects: orderArray
        }
        return result
    }

    async update(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const body: any = request.body!
        const order = await Order.findOne({ where: { id: body.id } })
        if (order) {
            await order.update(body)
            await order.save()
            return order.dataValues
        }
        else return {Error: `Order with id=${body.email} is not found`}
   }

    async delete(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const body: any = request.body!
        const order = await Order.findOne({ where: { id: body.id } })
        if (order) {
            await order.destroy()
            return {}
        }
        else return {Error: `Order with id=${body.email} is not found`}   
    }
}