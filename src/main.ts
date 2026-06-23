import "./store/initializer";
import {
  initMetricsStats,
  initCostStats,
  initDeployStats,
} from "./web-components";

initMetricsStats();
initCostStats();
initDeployStats();
