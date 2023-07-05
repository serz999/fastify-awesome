import { CRUD, Request, Response, ObjectsArrayWrap } from "./types"

export abstract class BaseController implements CRUD {

    protected Model: any = {} 

    async add(request: Request , response: Response): Promise<Object> { 
        const inst = await this.Model.create(request.body) 

        return inst
    }

    async getAll(request: Request , response: Response): Promise<ObjectsArrayWrap> {
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