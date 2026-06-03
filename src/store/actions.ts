import {
  ActionTypes,
  type DeployStats,
  type SetDeployErrorAction,
  type SetDeployLoadingAction,
  type SetDeployStatsAction,
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

export const storeActions = {
  setDeployLoading,
  setDeployError,
  setDeployStats,
};
