import { expect } from "chai"
import sinon from "sinon"
import { ModelRevision } from '../ModelRevision'   
import { faker } from "@faker-js/faker"
import { productRevision } from ".."

function modelFactory(attrs: Object) {}

function fieldAttrs(attrs: Object) {}

describe('ModelRevision', function () {
    describe('registerHooks',  function () {
        it('should make one revision when happened create of object', async function () {
            // const inst0 = await productRevision.TargetModel.create({price: 10})
            // const inst2 = await productRevision.TargetModel.create({})

            // await inst0.update({price: 100000})
            // await inst2.update({price: 222})
            // await inst2.update({price: 333})
            // await inst0.destroy()
            // await inst2.update({price: 444})

            // await productRevision.stash({instsUUIDs: ['4602c153-c084-4f80-8373-d83f40affd13']})
            // await productRevision.pop({instsUUIDs: ['ded895bc-febc-4175-a29d-239e4a262747']})
        })

        it('should make one revision when happened delete of object', async function () {
            
        })

        it('should make one revision when happened update of object', async function () {
        
        }) 
    })

    describe('stash', function () {
        it('should stash one revision')
        it('should stash three revisions')
        it('should stash one revisions for some objects') 
        it('should stash three revisions for some objects') 
        it('should stash one revision in all objects')
        it('should stash three revisions in all objects')
    })

    describe('stashAll', function () {
        it('should stash all available revisions')
        it('should stash all available revisions for some objects')
        it('should stash all available revisions for all objects')
    })
    
    describe('stashTo', function () {
        it('should stash all revisions to the assigned revision')
        it('should stash all revisions to the assigned revision for some objects')
        it('should stash all revisions to the assigned revision for all objects')
    })

    describe('pop', function () {
        it('should pop one revision')
        it('should pop three revisions')
        it('should pop one revisions for some objects') 
        it('should pop three revisions for some objects') 
        it('should pop one revision in all objects')
        it('should pop three revisions in all objects')
    })

    describe('popAll', function () {
        it('should pop all available revisions')
        it('should pop all available revisions for some objects')
        it('should pop all available revisions for all objects')
    })
    
    describe('popTo', function () {
        it('should pop all revisions to the assigned revision')
        it('should pop all revisions to the assigned revision for some objects')
        it('should pop all revisions to the assigned revision for all objects')
    })   
})