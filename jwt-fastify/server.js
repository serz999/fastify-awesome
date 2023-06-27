const fastify = require('fastify')({logger: true})
require('dotenv').config();
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
  })

fastify.register(require('./middleware/auth_middleware.js'));
fastify.register(require('./router/signin.js'));
fastify.register(require('./router/signup.js'));
fastify.register(require('./router/verify.js'));

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 4000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()