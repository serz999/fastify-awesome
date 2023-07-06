import { Request, Response, ObjectsArrayWrap } from "./types"
import { BaseController } from "./BaseController"

export abstract class ControllerWithVscSupport extends BaseController {
    protected modelRevision: any = {}

    async revisionsMethodsEval(request: Request, response: Response): Promise<Object> {
        const method = request.body.method
        const params = request.body.params

        if (method === 'stash') {
            await this.modelRevision.stash(params)
        }
        
        if (method === 'stashAll') {    
            await this.modelRevision.stashAll(params)
        }

        if (method === 'stashTo') {
            await this.modelRevision.stashTo(params)
        }
        
        if (method === 'pop'){
            await this.modelRevision.pop(params)
        }

        if (method === 'popAll') {
            await this.modelRevision.popAll(params)
        }

        if (method === 'popTo'){
            await this.modelRevision.popTo(params)
        }

        return { result: 'success' }
    }
}