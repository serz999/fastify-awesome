'use strict'
import { FastifyInstance } from "fastify";
import { UserModel } from "../../src/db/models/entities/user";
import { bcrypt, seq } from "../server";
import { validText } from "../sql-injection/stringCheck";


module.exports = async function (fastify: FastifyInstance) {
    fastify.post<{ Body: UserModel }>
        ('/signin', async (req, res) => {
            try {
                const { user_name, user_password } = req.body;
                //check wrong values
                if (!user_name || !user_password) {
                    res.status(400).send({ error: true, msg: "Some params are missing" });
                }
                if (!validText(user_name) || !validText(user_password)) {
                    res.status(400).send({ error: true, msg: "Wrong values" });
                }
                //DB check
                let correct = await seq.query('SELECT (user_password) FROM "User" WHERE user_name = ?;',
                    {
                        replacements: [user_name]
                    }
                );
                console.log(correct[0][0].user_password);
                if (correct[0][0].user_password!=undefined){
                if(await comparePassword(user_password, correct[0][0].user_password)){
                    res.send( generateJWT(user_name, user_password, fastify) )
                } else {
                    res.status(400).send({ error: true, msg: "wrong login or password" });
                }                  
                } else {
                    res.status(400).send({ error: true, msg: "wrong login or password" });
                }
            } catch (error) {
                throw error
            }
        })
}
function generateJWT(user_name:string,user_password:string,fastify:any){
    const token = fastify.jwt.sign({ user_name, user_password }, { expiresIn: 86400 });
    return {token};

}
async function compareUserName(name:any) {
    return 123;
}

async function comparePassword(plaintextPassword: string, hash: string) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    console.log(result);
    return result;
    
}