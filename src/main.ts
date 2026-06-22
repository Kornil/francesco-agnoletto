import { getState, dispatch, subscribe, actions } from "./store";
import { loadDeployStats } from "./store/deployApi";
import { loadCloudfrontMetrics } from "./store/metricsApi";
import { loadCostMetrics } from "./store/costApi";

declare global {
  interface Window {
    appStore: {
      getState: typeof getState;
      dispatch: typeof dispatch;
      subscribe: typeof subscribe;
      actions: typeof actions;
    };
  }
}

window.appStore = { getState, dispatch, subscribe, actions };

// Dynamically import web components after store is available
import("./web-components");

loadDeployStats();
loadCloudfrontMetrics();
loadCostMetrics();
