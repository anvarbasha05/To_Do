import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(":date[iso] :method :url"));


app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});


app.use("/api/v1", routes);

export default app;