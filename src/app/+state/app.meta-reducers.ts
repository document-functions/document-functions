import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState, appReducer } from './app.reducer';

export const reducers: ActionReducerMap<{ state: AppState }> = {
  state: appReducer,
};

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [{ state: ['tables', 'activeTableIndex', 'sideNavPanelContent'] }],
    storage: sessionStorage,
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
