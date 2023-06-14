const userValidateSchema = {
    schema:{
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                firstName: { type: 'string' },
                secondName: { type: 'string' },
                age: { type: 'number' }
            },
            required: ['firstName']
        }
    }
}

const userSerializeSchema = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    firstName: { type: 'string' },
                    secondName: { type: 'string' },
                    age: { type: 'number' } 
                }
            }
        }
    }
}

export {userValidateSchema, userSerializeSchema}