const pgp = require("pg-promise")(/*options*/);
let urlString = 'postgresql://postgres:1@localhost:5432/testdb'
const db = pgp(urlString);
module.exports = async function AuthRouter(fastify){
    fastify.post('/signin', async (req, res)=>{
        try {
            const { userid, password } = req.body;
            if(!userid || !password){
                res.status(400).send({error: true, msg: "Some params are missing"});
            }
            //DB check
            let correct = await db.query("SELECT EXISTS(SELECT * FROM user_auth WHERE user_name = $1 AND user_password = $2);", [userid,password]);
            if (correct[0].exists){
                //generate GWT
                const token =  fastify.jwt.sign({ userid, password }, 'topsecret', {expiresIn: 86400});
                res.send({token})
            }else{
                res.status(400).send({error: true, msg: "wrong login or password"});
            }
        } catch (error) {
            throw error
        }
    })
}
