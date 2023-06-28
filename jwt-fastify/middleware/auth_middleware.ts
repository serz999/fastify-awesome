import { FastifyInstance } from "fastify"

const fp = require("fastify-plugin")

module.exports = fp(async function(fastify:FastifyInstance) {
  fastify.decorate("authenticate", async function(request:any, reply:any) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})