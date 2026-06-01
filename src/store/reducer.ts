import { ActionTypes, type Store, type StoreAction } from "./types";

export const reducer = (state: Store, action: StoreAction): Store => {
  switch (action.type) {
    case ActionTypes.SET_DEPLOY_STATS:
      return {
        ...state,
        deploy: {
          runNumber: action.payload.runNumber,
          commit: action.payload.commit,
          durationSeconds: action.payload.durationSeconds,
        },
      };
    default:
      return state;
  }
};
