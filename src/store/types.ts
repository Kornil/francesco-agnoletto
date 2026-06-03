export const ActionTypes = {
  SET_DEPLOY_LOADING: "SET_DEPLOY_LOADING",
  SET_DEPLOY_ERROR: "SET_DEPLOY_ERROR",
  SET_DEPLOY_STATS: "SET_DEPLOY_STATS",
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

export interface Store {
  deploy: DeployState;
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

export type StoreAction =
  | SetDeployLoadingAction
  | SetDeployErrorAction
  | SetDeployStatsAction;
