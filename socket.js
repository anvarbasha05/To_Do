import { WebSocketServer } from "ws";
import { getUserIdFromToken } from "./middleware/auth.js"

let wss;
const userSockets = new Map();

export const setupSockets = (server) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");

    try {
      const userId = await getUserIdFromToken(token);

      userSockets.set(userId.toString(), ws);

      ws.send(JSON.stringify({ event: "connected", userId }));

      ws.on("message", (msg) => {
        console.log(`Message from ${userId}:`, msg.toString());
      });

      ws.on("close", () => {
        userSockets.delete(userId.toString());
        console.log(`User ${userId} disconnected`);
      });
    } catch (err) {
      ws.close(4001, err.message);
    }
  });

  return wss;
};


export const sendNotificationToUser = (userId, data) => {
  const ws = userSockets.get(userId.toString());
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify(data));
  }
};