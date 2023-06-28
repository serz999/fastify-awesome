'use strict'

import { FastifyInstance } from "fastify";
import { UserModel } from "../../src/db/models/entities/user";
import { seq } from "../server";
import { validText } from "../sql-injection";
import { ValidateEmail } from "../sql-injection";

module.exports = async function(fastify:FastifyInstance) {    
    fastify.post<{Body: UserModel }>
    ('/signup', async (req, res)=>{
        try {
            const { user_email, user_phoneNumber, user_firstName, user_secondName, user_age, user_name, user_password } = req.body;
            if(!user_email || !user_phoneNumber || !user_firstName || !user_secondName || !user_age || !user_name || !user_password){
                res.status(400).send({error: true, msg: "Some params are missing"});
            }
            if(!validText(user_phoneNumber) || !validText(user_firstName) || !validText(user_secondName) || !validText(user_name) || !validText(user_password)){
                res.status(400).send({error: true, msg: "Wrong values"});
            }
            if (!ValidateEmail(user_email)){
                res.status(400).send({error: true, msg: "You have entered an invalid email address!"});
            }
            console.log(ValidateEmail(user_email));
            console.log(validText(user_phoneNumber));
            //DB check
            let dublicate = await seq.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? OR user_email = ?);',
            {
                replacements: [user_name,user_email] 
            })
            if (dublicate[0][0].exists){
                res.status(400).send({error: true, msg: "login or email has already used"});
            }else{
                seq.query('INSERT INTO "User" ("user_email", "user_phoneNumber", "user_firstName", "user_secondName", "user_age", "user_name", "user_password") VALUES(?, ?, ?, ?, ?, ?, ?);',
                {
                    replacements: [user_email, user_phoneNumber, user_firstName, user_secondName, user_age, user_name, user_password]
                })
                return ({text: "Success!"})
            }
        } catch (error) {
            throw error
        }
    })
  }