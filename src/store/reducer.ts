import { ActionTypes, type Store, type StoreAction } from "./types";

export const reducer = (state: Store, action: StoreAction): Store => {
  switch (action.type) {
    case ActionTypes.SET_DEPLOY_LOADING:
      return {
        ...state,
        deploy: {
          ...state.deploy,
          loading: action.payload,
        },
      };
    case ActionTypes.SET_DEPLOY_ERROR:
      return {
        ...state,
        deploy: {
          ...state.deploy,
          error: action.payload,
        },
      };
    case ActionTypes.SET_DEPLOY_STATS:
      return {
        ...state,
        deploy: {
          ...state.deploy,
          stats: action.payload,
          error: null,
        },
      };
    case ActionTypes.SET_METRICS_LOADING:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          loading: action.payload,
        },
      };
    case ActionTypes.SET_METRICS_ERROR:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          error: action.payload,
        },
      };
    case ActionTypes.SET_METRICS_STATS:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          stats: action.payload,
          error: null,
        },
      };
    case ActionTypes.SET_COST_LOADING:
      return {
        ...state,
        cost: {
          ...state.cost,
          loading: action.payload,
        },
      };
    case ActionTypes.SET_COST_ERROR:
      return {
        ...state,
        cost: {
          ...state.cost,
          error: action.payload,
        },
      };
    case ActionTypes.SET_COST_STATS:
      return {
        ...state,
        cost: {
          ...state.cost,
          stats: action.payload,
          error: null,
        },
      };
    default:
      return state;
  }
};
