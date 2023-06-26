const boom = require('boom');
async function AuthRouter(fastify){
    fastify.post('/api/generateAccessToken/signin', async (req, res)=>{
        try {
            const { email, userid, password } = req.body;
            if(!email || !userid || !password){
                res.status(400).send({error: true, msg: "Some params are missing"});
            }
            // //DB check
            // let userData = await db.query("SELLECT email from user where user_id=?",[userid]);
            // if (userData && userData.lenth>0){
            //     //generate GWT
            // }
            const token = fastify.jwt.sign({email,userid,password},{expiresIn: 84688 });
            res.status(200).send({token,email})

        } catch (error) {
            throw boom.boomify(error)
        }
    })
}

module.exports = AuthRouter;