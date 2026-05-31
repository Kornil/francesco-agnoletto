import {
  ActionTypes,
  type DeployStats,
  type SetDeployStatsAction,
} from "./types";

export const setDeployStats = (stats: DeployStats): SetDeployStatsAction => ({
  type: ActionTypes.SET_DEPLOY_STATS,
  payload: stats,
});

export const storeActions = {
  setDeployStats,
};
