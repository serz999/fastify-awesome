import { User } from '../db/models/all-models';
import { BaseController, HttpGetEmit } from './interfaces'
import { FastifyReply, FastifyRequest } from "fastify";

export class UserController implements BaseController{
    
    constructor() {}

    async add(request: FastifyRequest, reply: FastifyReply): Promise<Object> { 
        const body: any = request.body!
        const createdUser = await User.create(body)
        return createdUser.dataValues
    }

    async get(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const allUsers = await User.findAll()
        const usersArray = new Array()
        for (const user of allUsers) {
            usersArray.push(user.dataValues)
        }

        const result: HttpGetEmit = {
            totalCount: usersArray.length,
            objects: usersArray
        }
        return result
    }

    async update(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const body: any = request.body!
        const user = await User.findOne({ where: { email: body.email } })
        if (user) {
            await user.update(body)
            await user.save()
            return user.dataValues
        }
        else return {Error: `User with email ${body.email} is not found`}
   }

    async delete(request: FastifyRequest, reply: FastifyReply): Promise<Object> {
        const body: any = request.body!
        const user = await User.findOne({ where: { email: body.email } })
        if (user) {
            await user.destroy()
            return {}
        }
        else return {Error: `User with email ${body.email} is not found`}   
    }
}
