export const ActionTypes = {
  SET_DEPLOY_STATS: "SET_DEPLOY_STATS",
} as const;

export interface DeployStats {
  runNumber: number;
  deployedAt: string;
  durationSeconds: number;
}

export interface Store {
  deploy: DeployStats;
}

export interface SetDeployStatsAction {
  type: typeof ActionTypes.SET_DEPLOY_STATS;
  payload: DeployStats;
}

export type StoreAction = SetDeployStatsAction;
