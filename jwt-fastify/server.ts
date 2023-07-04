const fastify = require('fastify')({logger: true})
const bcrypt = require("bcrypt")

const metricsPlugin = require('fastify-metrics');
fastify.register(metricsPlugin, metricsPlugin, {
  endpoint: '/metrics',
  routeMetrics: {
    overrides: {
      histogram: {
        name: 'my_custom_http_request_duration_seconds',
        buckets: [0.1, 0.5, 1, 3, 5],
      },
      summary: {
        help: 'custom request duration in seconds summary help',
        labelNames: ['status_code', 'method', 'route'],
        percentiles: [0.5, 0.75, 0.9, 0.95, 0.99],
      },
    },
  },
});

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

export {seq, fastify, bcrypt}