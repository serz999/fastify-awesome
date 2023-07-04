'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const stringCheck_1 = require("../sql-injection/stringCheck");
const stringCheck_2 = require("../sql-injection/stringCheck");
const server_2 = require("../server");
module.exports = async function (fastify) {
    fastify.post('/signup', async (req, res) => {
        try {
            const { user_email, user_phoneNumber, user_firstName, user_secondName, user_age, user_name, user_password } = req.body;
            //hash password
            const hash = await server_2.bcrypt.hash(user_password, 10);
            //check wrong values
            if (!user_email || !user_phoneNumber || !user_firstName || !user_secondName || !user_age || !user_name || !user_password) {
                res.status(400).send({ error: true, msg: "Some params are missing" });
            }
            if (!(0, stringCheck_1.validText)(user_phoneNumber) || !(0, stringCheck_1.validText)(user_firstName) || !(0, stringCheck_1.validText)(user_secondName) || !(0, stringCheck_1.validText)(user_name) || !(0, stringCheck_1.validText)(user_password)) {
                res.status(400).send({ error: true, msg: "Wrong values" });
            }
            if (!(0, stringCheck_2.ValidateEmail)(user_email)) {
                res.status(400).send({ error: true, msg: "You have entered an invalid email address!" });
            }
            //DB check
            let dublicate = await server_1.seq.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? OR user_email = ?);', {
                replacements: [user_name, user_email]
            });
            if (dublicate[0][0].exists) {
                res.status(400).send({ error: true, msg: "login or email has already used" });
            }
            else {
                server_1.seq.query('INSERT INTO "User" ("user_email", "user_phoneNumber", "user_firstName", "user_secondName", "user_age", "user_name", "user_password") VALUES(?, ?, ?, ?, ?, ?, ?);', {
                    replacements: [user_email, user_phoneNumber, user_firstName, user_secondName, user_age, user_name, hash]
                });
                return ({ text: "Success!" });
            }
        }
        catch (error) {
            throw error;
        }
    });
};
async function hashPassword(plaintextPassword) {
    const hash = await server_2.bcrypt.hash(plaintextPassword, 10);
    return hash;
    // Store hash in the database
}
