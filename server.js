const http = require('http');//importing http
const app = require('./app');

const port = process.env.PORT || 3000;//setting the port

const server = http.createServer(app);//creating server, requires app to start server

server.listen(port);//setting the server to listen to the port 3000;
