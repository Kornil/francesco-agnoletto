import { getState, dispatch, subscribe, actions } from ".";
import { loadCostMetrics } from "./costApi";
import { loadDeployStats } from "./deployApi";
import { loadCloudfrontMetrics } from "./metricsApi";

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

loadDeployStats();
loadCloudfrontMetrics();
loadCostMetrics();
