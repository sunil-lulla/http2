"use strict";

const fs = require("fs");
const path = require("path");
const fastify = require("fastify")({
	http2: true,
	https: {
		allowHTTP1: true, // fallback support for HTTP1
		key: fs.readFileSync("server.key"),
		cert: fs.readFileSync("server.crt")
	}
});

fastify.get("/", function(request, reply) {
	reply.code(200).send({ hello: "world" });
});

fastify.listen(3000);
fastify.ready().then(
	() => {
		console.log("successfully booted!");
	},
	err => {
		console.log("an error happened", err);
	}
);
