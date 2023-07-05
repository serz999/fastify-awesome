import { FastifyReply } from "fastify"

export type Request = any
export type Response = FastifyReply

export interface ObjectsArrayWrap {
    totalCount: number,
    objects: Array<Object>
}

export interface CRUD {
    
    add(request: Request , response: Response): Promise<Object>
    
    getAll(request: Request , response: Response): Promise<ObjectsArrayWrap> 
    
    getById(request: Request , response: Response): Promise<Object> 
    
    update(request: Request, response: Response): Promise<Object>   

    delete(request: Request, response: Response): Promise<Object>
}