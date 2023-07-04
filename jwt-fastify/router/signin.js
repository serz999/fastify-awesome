'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const stringCheck_1 = require("../sql-injection/stringCheck");
module.exports = async function (fastify) {
    fastify.post('/signin', async (req, res) => {
        try {
            const { user_name, user_password } = req.body;
            //check wrong values
            if (!user_name || !user_password) {
                res.status(400).send({ error: true, msg: "Some params are missing" });
            }
            if (!(0, stringCheck_1.validText)(user_name) || !(0, stringCheck_1.validText)(user_password)) {
                res.status(400).send({ error: true, msg: "Wrong values" });
            }
            //DB check
            let correct = await server_1.seq.query('SELECT (user_password) FROM "User" WHERE user_name = ?;', {
                replacements: [user_name]
            });
            console.log(correct[0][0].user_password);
            if (correct[0][0].user_password != undefined) {
                if (await comparePassword(user_password, correct[0][0].user_password)) {
                    res.send(generateJWT(user_name, user_password, fastify));
                }
                else {
                    res.status(400).send({ error: true, msg: "wrong login or password" });
                }
            }
            else {
                res.status(400).send({ error: true, msg: "wrong login or password" });
            }
        }
        catch (error) {
            throw error;
        }
    });
};
function generateJWT(user_name, user_password, fastify) {
    const token = fastify.jwt.sign({ user_name, user_password }, { expiresIn: 86400 });
    return { token };
}
async function compareUserName(name) {
    return 123;
}
async function comparePassword(plaintextPassword, hash) {
    const result = await server_1.bcrypt.compare(plaintextPassword, hash);
    console.log(result);
    return result;
}
