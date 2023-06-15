const userTemplate = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        phoneNumber: { type: 'string' },
        firstName: { type: 'string' },
        secondName: { type: 'string' },
        age: { type: 'number' } 
    }
}

const getAllSchema = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    totalCount: { type: 'number' },
                    objects: { 
                        type: 'array',
                        items: userTemplate
                    }
                }
            }
        }
    },
}

const getByIdSchema = {
    schema: { 
        response: {
            200: userTemplate
        }, 
    }
}

const postSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                phoneNumber: { type: 'string' },
                firstName: { type: 'string' },
                secondName: { type: 'string' },
                age: { type: 'number' }
            },
            required: ['email', 'firstName']
        }, 
        querystring: {
            id: { type: 'number' }
        },
    }
}


export { getAllSchema, getByIdSchema, postSchema}