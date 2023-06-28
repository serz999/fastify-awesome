const fastify = require('fastify')({logger: true})
require('dotenv').config();
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
  })

const Sequelize = require('sequelize');
const seq = new Sequelize('postgres://'+process.env.POSTGRES_USER+':'+process.env.POSTGRES_PASSWORD+'@'+process.env.POSTGRES_HOST+':'+process.env.POSTGRES_PORT+'/'+process.env.POSTGRES_DB);

fastify.register(require('./middleware/auth_middleware.js'));
fastify.register(require('./router/signin.js'));
fastify.register(require('./router/signup.js'));
fastify.register(require('./router/verify.js'));

fastify.get('/', async (request: any, reply: any) => {
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

export {seq, fastify}