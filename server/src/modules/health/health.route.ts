import { Router } from "express";
import HealthController from "./health.controller.js";

const healthRoutes: Router = Router();
const healthController = new HealthController();

healthRoutes.get(
  "/liveness",
  healthController.livenessController.bind(healthController),
);
healthRoutes.get(
  "/readiness",
  healthController.readinessController.bind(healthController),
);
healthRoutes.get(
  "/",
  healthController.readinessController.bind(healthController),
);

export default healthRoutes;
