import { createReducer, on } from '@ngrx/store';
import { AppApiActions, AppPageActions } from './actions';

export interface AppState {
  id: string;
}

export const initialState: AppState = {
  id: '1',
};

export const appReducer = createReducer(initialState);
