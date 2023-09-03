import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectAppState = createFeatureSelector<AppState>('state');

export const selectTables = createSelector(
  selectAppState,
  (state) => state.tables
);

export const selectActiveTableIndex = createSelector(
  selectAppState,
  (state) => state.activeTableIndex
);

export const selectSideNavPanelContent = createSelector(
  selectAppState,
  (state) => state.sideNavPanelContent
);
