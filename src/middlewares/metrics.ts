import type { NextFunction, Request, Response } from "express";
import { httpRequestDuration, httpRequestTotal } from "../monitoring";

export const metricsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const end = httpRequestDuration.startTimer();
  response.on("finish", () => {
    httpRequestTotal.inc({
      method: request.method,
      route: request.path,
      status: response.statusCode,
    });
    end({
      method: request.method,
      route: request.path,
      status: response.statusCode,
    });
  });
  next();
};
