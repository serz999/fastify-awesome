import fastify, { FastifyContextConfig, FastifyInstance } from "fastify"


module.exports = async function(fastify:FastifyInstance) {
    fastify.get(
      "/verify",
      {
        onRequest: [createHendler(fastify)]
      },
      async function(request:any, reply:any) {
        return ({text: "success"})
      }
    )
  }
  function createHendler(fastify:any)
  {
    return fastify.authenticate
  }