"use strict";

const fs = require("fs");
const path = require("path");
const fastify = require("fastify")({
	http2: true,
	https: {
		key: fs.readFileSync("server.key"),
		cert: fs.readFileSync("server.crt")
	}
});

fastify.get("/", function(request, reply) {
	reply.code(200).send({ hello: "world" });
});

fastify.listen(3000);
