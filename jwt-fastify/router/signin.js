'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const sql_injection_1 = require("../sql-injection");
module.exports = function (fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/signin', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_name, user_password } = req.body;
                if (!user_name || !user_password) {
                    res.status(400).send({ error: true, msg: "Some params are missing" });
                }
                if (!(0, sql_injection_1.validText)(user_name) || !(0, sql_injection_1.validText)(user_password)) {
                    res.status(400).send({ error: true, msg: "Wrong values" });
                }
                //DB check
                let correct = yield server_1.seq.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? AND user_password = ?);', {
                    replacements: [user_name, user_password]
                });
                if (correct[0][0].exists) {
                    //generate JWT
                    res.send(generateJWT(user_name, user_password, fastify));
                }
                else {
                    res.status(400).send({ error: true, msg: "wrong login or password" });
                }
            }
            catch (error) {
                throw error;
            }
        }));
    });
};
function generateJWT(user_name, user_password, fastify) {
    const token = fastify.jwt.sign({ user_name, user_password }, { expiresIn: 86400 });
    return { token };
}
