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
const sql_injection_2 = require("../sql-injection");
module.exports = function (fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email, user_phoneNumber, user_firstName, user_secondName, user_age, user_name, user_password } = req.body;
                if (!user_email || !user_phoneNumber || !user_firstName || !user_secondName || !user_age || !user_name || !user_password) {
                    res.status(400).send({ error: true, msg: "Some params are missing" });
                }
                if (!(0, sql_injection_1.validText)(user_phoneNumber) || !(0, sql_injection_1.validText)(user_firstName) || !(0, sql_injection_1.validText)(user_secondName) || !(0, sql_injection_1.validText)(user_name) || !(0, sql_injection_1.validText)(user_password)) {
                    res.status(400).send({ error: true, msg: "Wrong values" });
                }
                if (!(0, sql_injection_2.ValidateEmail)(user_email)) {
                    res.status(400).send({ error: true, msg: "You have entered an invalid email address!" });
                }
                console.log((0, sql_injection_2.ValidateEmail)(user_email));
                console.log((0, sql_injection_1.validText)(user_phoneNumber));
                //DB check
                let dublicate = yield server_1.seq.query('SELECT EXISTS(SELECT * FROM "User" WHERE user_name = ? OR user_email = ?);', {
                    replacements: [user_name, user_email]
                });
                if (dublicate[0][0].exists) {
                    res.status(400).send({ error: true, msg: "login or email has already used" });
                }
                else {
                    server_1.seq.query('INSERT INTO "User" ("user_email", "user_phoneNumber", "user_firstName", "user_secondName", "user_age", "user_name", "user_password") VALUES(?, ?, ?, ?, ?, ?, ?);', {
                        replacements: [user_email, user_phoneNumber, user_firstName, user_secondName, user_age, user_name, user_password]
                    });
                    return ({ text: "Success!" });
                }
            }
            catch (error) {
                throw error;
            }
        }));
    });
};
