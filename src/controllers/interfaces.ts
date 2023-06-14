import { FastifyRequest, FastifyReply } from "fastify"


export interface BaseController {
    
    add(request: FastifyRequest , reply: FastifyReply): Promise<Object>
    
    get(request: FastifyRequest , reply: FastifyReply): Promise<Object> 
    
    update(request: FastifyRequest, reply: FastifyReply): Promise<Object>   

    delete(request: FastifyRequest, reply: FastifyReply): Promise<Object>
}

export interface HttpGetEmit {
    totalCount: number,
    objects: Array<Object>
}
