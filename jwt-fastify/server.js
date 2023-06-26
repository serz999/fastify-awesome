const fastify = require('fastify')({logger: true})
require('dotenv').config();
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
  })


fastify.register(require('./middleware/auth_middleware.js'));
fastify.register(require('./router/signin.js'));
fastify.register(require('./router/signup.js'));
fastify.register(require('./router/verify.js'));


fastify.listen({port: 8070}, err => {
    if (err) throw err
})