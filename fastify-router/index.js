async function routes(fastify, routes) {
	fastify.get("/", async (request, reply) => {
		reply.code(200).send({ msg: "hello world" });
	});
}

module.exports = routes;
