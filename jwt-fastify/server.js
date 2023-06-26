const fastify = require('fastify')({logger: true})
const boom = require('boom');
fastify.register(require('fastify'),{
    secret: process.env.JWT_SECRE
})

fastify.addContentTypeParser('application/json',{parseAs: 'string'},(req, body, done)=>{
    try {
        const json = JSON.parse(body);
        done(null,json);
    } catch (err){
        err.statusCode = 400;
        done(err, undefined);
    }
});
//stop here
fastify.register(require('./16:52'))

fastify.post('/insertData', async (req, res)=>{
    try {
        let{params} = req.body;
        res.status(200).send({msg: "resied data"});
    } catch (error) {
        throw boom.boomify(error)
    }
})