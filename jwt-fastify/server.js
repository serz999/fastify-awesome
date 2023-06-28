"use strict";
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
exports.fastify = exports.seq = void 0;
const fastify = require('fastify')({ logger: true });
exports.fastify = fastify;
require('dotenv').config();
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
});
const Sequelize = require('sequelize');
const seq = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@' + process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DB);
exports.seq = seq;
fastify.register(require('./middleware/auth_middleware.js'));
fastify.register(require('./router/signin.js'));
fastify.register(require('./router/signup.js'));
fastify.register(require('./router/verify.js'));
fastify.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { hello: 'world' };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ host: '0.0.0.0', port: 4000 });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
