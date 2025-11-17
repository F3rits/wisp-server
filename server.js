import { WebSocketServer } from "ws";
import http from "http";
import { wispHandler } from "@mercuryworkshop/wisp-server";

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Wisp server running");
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  if (req.url === "/wisp/") {
    wss.handleUpgrade(req, socket, head, ws => {
      wispHandler(ws);
    });
  } else {
    socket.destroy();
  }
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Wisp server running on port ${port}`);
});
