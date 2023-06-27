'use strict'
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://'+process.env.POSTGRES_USER+':'+process.env.POSTGRES_PASSWORD+'@'+process.env.POSTGRES_HOST+':'+process.env.POSTGRES_PORT+'/'+process.env.POSTGRES_DB);

module.exports = async function(fastify) {    
    fastify.post('/signup', async (req, res)=>{
        try {
            const { email, phoneNumber, firstName, secondName, age, userid, password } = req.body;
            if(!email || !phoneNumber || !firstName || !secondName || !age || !userid || !password){
                res.status(400).send({error: true, msg: "Some params are missing"});
            }
            //DB check
            let dublicate = await sequelize.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? OR user_email = ?);',
            {
                replacements: [userid,email] 
            })
            if (dublicate[0][0].exists){
                res.status(400).send({error: true, msg: "login or email has already used"});
            }else{
                sequelize.query('INSERT INTO "User" ("user_email", "user_phoneNumber", "user_firstName", "user_secondName", "user_age", "user_name", "user_password") VALUES(?, ?, ?, ?, ?, ?, ?);',
                {
                    replacements: [email, phoneNumber, firstName, secondName, age, userid, password]
                })
                return ({text: "Success!"})
            }
        } catch (error) {
            throw error
        }
    })
  }