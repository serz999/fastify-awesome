const pgp = require("pg-promise")(/*options*/);
let urlString = 'postgresql://postgres:1@localhost:5432/testdb'
const db = pgp(urlString);
module.exports = async function(fastify, opts) {
    
    fastify.post('/signup', async (req, res)=>{
        
        try {
            const { userid, email, password } = req.body;
            if(!email || !userid || !password){
                res.status(400).send({error: true, msg: "Some params are missing"});
            }
            //DB check
            let dublicate = await db.query('SELECT EXISTS(SELECT * FROM user_auth WHERE user_name = $1 OR user_email = $2);', [userid,email])
            if (dublicate[0].exists){
                res.status(400).send({error: true, msg: "login or email has already used"});
            }else{
                db.query('INSERT INTO user_auth (user_name, user_email, user_password) VALUES($1, $2, $3);',[userid, email, password])
                return ({text: "Success!"})
            }
        } catch (error) {
            throw error
        }
    })
  }