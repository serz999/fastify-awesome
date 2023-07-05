import { ModelStatic, Model } from "sequelize"
import { FastifyReply } from "fastify/types/reply"

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

export class BaseController implements CRUD {

    protected Model: ModelStatic<Model<any, any>>

    constructor(Model: ModelStatic<Model<any, any>>) {
        this.Model = Model
    }


    async add(request: Request , response: Response): Promise<Object> { 
        const inst = await this.Model.create(request.body) 

        return inst
    }

    async getAll(request: Request , response: Response): Promise<ObjectsWrapp> {
        const allInsts = await this.Model.findAll()

        return {
            totalCount: allInsts.length,
            objects: allInsts
        }
    }

    async getById(request: Request , response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }  
        } 
        
        return inst
    }

    async update(request: Request , response: Response): Promise<Object> { 
        const inst: any = await this.Model.findByPk(request.params.id) 

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }
        }
        
        await inst.update(request.body)

        return inst 
   }

    async delete(request: Request, response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }   
        }

        await inst.destroy()

        return {}
    } 
}