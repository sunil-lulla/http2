const http2 = require("http2");
const fs = require("fs");
const {
	HTTP2_HEADER_METHOD,
	HTTP2_HEADER_PATH,
	HTTP2_HEADER_STATUS,
	HTTP2_HEADER_CONTENT_TYPE
} = http2.constants;

const server = http2.createSecureServer({
	key: fs.readFileSync("localhost-privkey.pem"),
	cert: fs.readFileSync("localhost-cert.pem")
});
server.on("error", err => console.error(err));

server.on("stream", (stream, headers) => {
	const method = headers[HTTP2_HEADER_METHOD];
	const path = headers[HTTP2_HEADER_PATH];
	console.log(path);
	console.log(path.match(/abc/g));

	if (path.match(/abc/g)) {
		stream.respond({
			[HTTP2_HEADER_CONTENT_TYPE]: "text/html",
			[HTTP2_HEADER_STATUS]: 200
		});
		stream.end("<h1>Hello World</h1>");
	} else {
		// stream is a Duplex
		stream.respond({
			[HTTP2_HEADER_CONTENT_TYPE]: "text/html",
			[HTTP2_HEADER_STATUS]: 200
		});
		stream.end("<h1>Hello World</h1>");
	}
});

server.listen(3000);
