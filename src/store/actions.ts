import {
  ActionTypes,
  type CloudfrontMetrics,
  type CostBreakdownItem,
  type DeployStats,
  type SetDeployErrorAction,
  type SetDeployLoadingAction,
  type SetDeployStatsAction,
  type SetMetricsErrorAction,
  type SetMetricsLoadingAction,
  type SetMetricsStatsAction,
  type SetCostErrorAction,
  type SetCostLoadingAction,
  type SetCostStatsAction,
} from "./types";

export const setDeployLoading = (loading: boolean): SetDeployLoadingAction => ({
  type: ActionTypes.SET_DEPLOY_LOADING,
  payload: loading,
});

export const setDeployError = (error: string | null): SetDeployErrorAction => ({
  type: ActionTypes.SET_DEPLOY_ERROR,
  payload: error,
});

export const setDeployStats = (stats: DeployStats): SetDeployStatsAction => ({
  type: ActionTypes.SET_DEPLOY_STATS,
  payload: stats,
});

export const setMetricsLoading = (
  loading: boolean,
): SetMetricsLoadingAction => ({
  type: ActionTypes.SET_METRICS_LOADING,
  payload: loading,
});

export const setMetricsError = (
  error: string | null,
): SetMetricsErrorAction => ({
  type: ActionTypes.SET_METRICS_ERROR,
  payload: error,
});

export const setMetricsStats = (
  stats: CloudfrontMetrics,
): SetMetricsStatsAction => ({
  type: ActionTypes.SET_METRICS_STATS,
  payload: stats,
});

export const setCostLoading = (loading: boolean): SetCostLoadingAction => ({
  type: ActionTypes.SET_COST_LOADING,
  payload: loading,
});

export const setCostError = (error: string | null): SetCostErrorAction => ({
  type: ActionTypes.SET_COST_ERROR,
  payload: error,
});

export const setCostStats = (
  stats: CostBreakdownItem[],
): SetCostStatsAction => ({
  type: ActionTypes.SET_COST_STATS,
  payload: stats,
});

export const storeActions = {
  setDeployLoading,
  setDeployError,
  setDeployStats,
  setMetricsLoading,
  setMetricsError,
  setMetricsStats,
  setCostLoading,
  setCostError,
  setCostStats,
};
