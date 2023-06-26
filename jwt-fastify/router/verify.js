module.exports = async function(fastify, opts) {
    fastify.get(
      "/verify",
      {
        onRequest: [fastify.authenticate]
      },
      async function(request, reply) {
        return ({text: "success"})
      }
    )
  }