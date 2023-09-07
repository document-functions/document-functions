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

export const selectRowCountCriteria = createSelector(
  selectAppState,
  (state) => state.rowCountCriteria
);

export const selectColumnSumCriteria = createSelector(
  selectAppState,
  (state) => state.columnSumCriteria
);

export const selectIsRuleLoading = createSelector(
  selectAppState,
  (state) => state.isRuleLoading
);

export const selectTableOperationsAction = createSelector(
  selectAppState,
  (state) => state.tableOPerationsAction
);

// TODO
export const selectActiveRowCountCriteriaHeaders = createSelector(
  selectAppState,
  (state) => ['a', 'b', 'c']
);
