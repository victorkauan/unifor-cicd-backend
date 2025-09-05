import prometheusClient from "prom-client";

export const prometheusRegister = new prometheusClient.Registry();
prometheusClient.collectDefaultMetrics({ register: prometheusRegister });

export const httpRequestTotal = new prometheusClient.Counter({
  name: "http_request_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
prometheusRegister.registerMetric(httpRequestTotal);

export const httpRequestDuration = new prometheusClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 2, 5],
});
prometheusRegister.registerMetric(httpRequestDuration);
