import { storeActions } from "./actions";
import { reducer } from "./reducer";
import type { Store, StoreAction } from "./types";

// Internal immutable state variable following TEA/Elm semantics.
let state: Store = {
  deploy: {
    runNumber: 0,
    deployedAt: "",
    durationSeconds: 0,
  },
};

// Subscribers are notified after each dispatch.
const subscribers = new Set<() => void>();

export const getState = (): Readonly<Store> => state;
export const actions: typeof storeActions = storeActions;

export const dispatch = (action: StoreAction): void => {
  // Reducer returns a new Store value; we replace the internal state variable.
  state = reducer(state, action);
  for (const s of subscribers) s();
};

export const subscribe = (listener: () => void): (() => void) => {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
};
