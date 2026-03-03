import { WebSocketServer } from "ws";

let wss; 

export const setupSockets = (server) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");


    ws.send(JSON.stringify({ event: "connected", message: "Web socket connected successfully" }));


    ws.on("message", (msg) => {
      console.log("Received from client:", msg.toString());
      ws.send(`Echo: ${msg.toString()}`);
    });

    ws.on("close", () => console.log("Client disconnected"));
  });

  return wss;
};

export const sendNotification = (data) => {
  if (!wss) return;

  const message = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};