import express from "express";
import cors from "cors";
import productRouter from "./routes/product";
import { metricsMiddleware } from "./middlewares/metrics";
import { prometheusRegister } from "./monitoring";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);
app.use("/api/products", productRouter);

app.get("/api/health", (_, response) => {
  response.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.get("/metrics", async (_, response) => {
  response.set("Content-Type", prometheusRegister.contentType);
  response.end(await prometheusRegister.metrics());
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
