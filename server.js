import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { setupSockets } from "./socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

setupSockets(server);


const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

startServer();