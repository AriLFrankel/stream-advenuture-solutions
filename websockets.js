const WebSocket = require("ws");
const webSocket = new WebSocket("http://localhost:8099");
const webSocketStream = WebSocket.createWebSocketStream(webSocket);

webSocketStream.pipe(process.stdout);
webSocketStream.write("hello\n");
