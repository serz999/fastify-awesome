import { FastifyInstance } from "fastify";
import { seq } from "../server";


module.exports = async function (fastify: FastifyInstance) {
    fastify.get
        ('/dbuser', async (req, res) => {
            try {
                let correct = await seq.query('SELECT * FROM "User"')
                return {correct}
            } catch (error) {
                throw error
            }
        })
}