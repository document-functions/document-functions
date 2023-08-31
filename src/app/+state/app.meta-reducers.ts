import { localStorageSync } from './ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';

export function sessionStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      // {
      //   state: 'state',
      //   slices: ['id'],
      // },
    ],
    storage: sessionStorage,
  })(reducer);
}
