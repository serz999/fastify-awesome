'use strict'
require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
     {
         dialect: 'postgres',
     }
 );
module.exports = async function (fastify){
    fastify.post('/signin', async (req, res)=>{
        try {
            const { userid, password } = req.body;
            if(!userid || !password){
                res.status(400).send({error: true, msg: "Some params are missing"});
            }
            //DB check
            let correct = await sequelize.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? AND user_password = ?);',
            {
                 replacements: [userid,password]
            }
            );
            if (correct[0][0].exists){
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
