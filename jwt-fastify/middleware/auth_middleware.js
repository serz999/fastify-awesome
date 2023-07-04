"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fp = require("fastify-plugin");
module.exports = fp(async function (fastify) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
});
