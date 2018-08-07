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

fastify.register(require("./fastify-router"));

// fastify.get("/", function(request, reply) {
// 	reply.code(200).send({ hello: "world" });
// });
console.log(path.join(__dirname, "public"));
fastify.register(require("fastify-static"), {
	root: path.join(__dirname, "public"),
	prefix: "/public/" // optional: default '/'
});

// fastify.get("/another", function(req, reply) {
// 	reply.sendFile(path.join(__dirname, "public", "index.css")); // serving path.join(__dirname, 'public', 'myHtml.html') directly
// });

fastify.listen(3000, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	console.log("Server Running on port 3000");
});
