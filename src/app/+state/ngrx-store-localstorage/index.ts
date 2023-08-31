import * as deepmerge from 'deepmerge';

import { get, set } from 'lodash';

interface Keys {
  state: string;

  slices: string[];

  isFeature?: boolean;
}

export interface LocalStorageConfig {
  keys: Keys[];

  storage: Storage;
}

const INIT_ACTION = '@ngrx/store/init';

const UPDATE_ACTION = '@ngrx/store/update-reducers';

const RECOMPUTE_ACTION = '@ngrx/store-devtools/recompute';

const rehydrateSate = (keys: Keys[], storage: any, recompute = false) => {
  const persistedState: any = {};

  keys.forEach(({ state, isFeature }) => {
    const slice = JSON.parse(storage.getItem(state) as string);

    if (slice && !isFeature) {
      persistedState[state] = slice;
    }

    if (slice && recompute && isFeature) {
      persistedState[state] = slice;
    }
  });

  return persistedState;
};

export const localStorageSync =
  (config: LocalStorageConfig) => (reducer: any) => {
    const storage = config.storage;

    const keys = config.keys;

    let persistedState: any = rehydrateSate(keys, storage);

    let recompute = false;

    return function (state: any, action: any) {
      let nextState: any;

      if (action.type === INIT_ACTION && !state) {
        nextState = reducer(state, action);
      } else {
        nextState = { ...state };
      }

      if (action.type === RECOMPUTE_ACTION) {
        recompute = true;

        persistedState = rehydrateSate(keys, storage, recompute);
      }

      if (
        (action.type === INIT_ACTION ||
          action.type === UPDATE_ACTION ||
          action.type === RECOMPUTE_ACTION) &&
        persistedState
      ) {
        const overwriteMerge = (
          destinationArray: any,

          sourceArray: any,

          options: any
        ) => sourceArray;

        const options: deepmerge.Options = {
          arrayMerge: overwriteMerge,
        };

        nextState = deepmerge(nextState, persistedState, options);
      } else {
        nextState = reducer(nextState, action);
      }

      if (action.type !== INIT_ACTION && state) {
        keys.forEach((key) => {
          if (nextState[key.state] && !key.slices?.length) {
            storage.setItem(key.state, JSON.stringify(nextState[key.state]));
          }

          if (nextState[key.state] && key.slices?.length) {
            const persistedSlice: any = {};

            key.slices.forEach((slicePath) => {
              const slice = get(nextState[key.state], slicePath);

              set(persistedSlice, slicePath, slice);
            });

            if (!key.isFeature) {
              storage.setItem(key.state, JSON.stringify(persistedSlice));
            }

            if (recompute) {
              storage.setItem(key.state, JSON.stringify(persistedSlice));
            }
          }
        });
      }

      return reducer(nextState, action);
    };
  };
