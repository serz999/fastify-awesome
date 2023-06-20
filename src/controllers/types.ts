import { FastifyRequest, FastifyReply } from "fastify"


type Request = any

type Response = FastifyReply

interface ObjectsWrapp {
    totalCount: number,
    objects: Array<Object>
}

interface CRUD {
    
    add(request: Request , response: Response): Promise<Object>
    
    getAll(request: Request , response: Response): Promise<ObjectsWrapp> 
    
    getById(request: Request , response: Response): Promise<Object> 
    
    update(request: Request, response: Response): Promise<Object>   

    delete(request: Request, response: Response): Promise<Object>
}

interface Auditable {

    getLog(request: Request , response: Response): Promise<Object>
}

export { Request, Response, CRUD, ObjectsWrapp, Auditable}