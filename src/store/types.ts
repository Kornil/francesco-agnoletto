export const ActionTypes = {
  SET_DEPLOY_LOADING: "SET_DEPLOY_LOADING",
  SET_DEPLOY_ERROR: "SET_DEPLOY_ERROR",
  SET_DEPLOY_STATS: "SET_DEPLOY_STATS",
  SET_METRICS_LOADING: "SET_METRICS_LOADING",
  SET_METRICS_ERROR: "SET_METRICS_ERROR",
  SET_METRICS_STATS: "SET_METRICS_STATS",
  SET_COST_LOADING: "SET_COST_LOADING",
  SET_COST_ERROR: "SET_COST_ERROR",
  SET_COST_STATS: "SET_COST_STATS",
} as const;

export interface DeployStats {
  runNumber: number;
  commit: string;
  durationSeconds: number;
}

export interface DeployState {
  loading: boolean;
  error: string | null;
  stats: DeployStats | null;
}

export interface CloudfrontMetrics {
  requests: number;
  bandwidth: number;
  cacheHitRate: number;
  originLatency: number;
  availability: number;
}

export interface MetricsState {
  loading: boolean;
  error: string | null;
  stats: CloudfrontMetrics | null;
}

export interface CostBreakdownItem {
  service: string;
  amount: string;
}

export interface CostState {
  loading: boolean;
  error: string | null;
  stats: CostBreakdownItem[] | null;
}

export interface Store {
  deploy: DeployState;
  metrics: MetricsState;
  cost: CostState;
}

export interface SetDeployLoadingAction {
  type: typeof ActionTypes.SET_DEPLOY_LOADING;
  payload: boolean;
}

export interface SetDeployErrorAction {
  type: typeof ActionTypes.SET_DEPLOY_ERROR;
  payload: string | null;
}

export interface SetDeployStatsAction {
  type: typeof ActionTypes.SET_DEPLOY_STATS;
  payload: DeployStats;
}

export interface SetMetricsLoadingAction {
  type: typeof ActionTypes.SET_METRICS_LOADING;
  payload: boolean;
}

export interface SetMetricsErrorAction {
  type: typeof ActionTypes.SET_METRICS_ERROR;
  payload: string | null;
}

export interface SetMetricsStatsAction {
  type: typeof ActionTypes.SET_METRICS_STATS;
  payload: CloudfrontMetrics;
}

export interface SetCostLoadingAction {
  type: typeof ActionTypes.SET_COST_LOADING;
  payload: boolean;
}

export interface SetCostErrorAction {
  type: typeof ActionTypes.SET_COST_ERROR;
  payload: string | null;
}

export interface SetCostStatsAction {
  type: typeof ActionTypes.SET_COST_STATS;
  payload: CostBreakdownItem[];
}

export type StoreAction =
  | SetDeployLoadingAction
  | SetDeployErrorAction
  | SetDeployStatsAction
  | SetMetricsLoadingAction
  | SetMetricsErrorAction
  | SetMetricsStatsAction
  | SetCostLoadingAction
  | SetCostErrorAction
  | SetCostStatsAction;
