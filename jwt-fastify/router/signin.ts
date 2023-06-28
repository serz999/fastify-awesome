'use strict'
import { FastifyInstance } from "fastify";
import { UserModel } from "../../src/db/models/entities/user";
import { seq } from "../server";
import { validText } from "../sql-injection";


module.exports = async function (fastify: FastifyInstance) {
    fastify.post<{ Body: UserModel }>
        ('/signin', async (req, res) => {
            try {
                const { user_name, user_password } = req.body;
                if (!user_name || !user_password) {
                    res.status(400).send({ error: true, msg: "Some params are missing" });
                }
                if (!validText(user_name) || !validText(user_password)) {
                    res.status(400).send({ error: true, msg: "Wrong values" });
                }
                //DB check
                let correct = await seq.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? AND user_password = ?);',
                    {
                        replacements: [user_name, user_password]
                    }
                );
                if (correct[0][0].exists) {
                    //generate JWT
                   
                    res.send( generateJWT(user_name, user_password, fastify) )
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