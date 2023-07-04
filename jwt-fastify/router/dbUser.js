"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
module.exports = async function (fastify) {
    fastify.get('/dbuser', async (req, res) => {
        try {
            let correct = await server_1.seq.query('SELECT * FROM "User"');
            return { correct };
        }
        catch (error) {
            throw error;
        }
    });
};
