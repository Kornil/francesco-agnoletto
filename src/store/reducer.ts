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
    default:
      return state;
  }
};
