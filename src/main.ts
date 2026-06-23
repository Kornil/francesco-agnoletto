import "./store/initializer";

// Dynamically import web components after store is available
import("./web-components");

loadDeployStats();
loadCloudfrontMetrics();
loadCostMetrics();
