"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async function (fastify) {
    fastify.get("/verify", {
        onRequest: [createHendler(fastify)]
    }, async function (request, reply) {
        return ({ text: "success" });
    });
};
function createHendler(fastify) {
    return fastify.authenticate;
}
