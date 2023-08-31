import { createReducer, on } from '@ngrx/store';
import { AppApiActions, AppPageActions } from './actions';
import { XlsxData } from '../models/xlsx-data';

export interface AppState {
  tables: XlsxData[];
}

export const initialState: AppState = {
  tables: [],
};

export const appReducer = createReducer(
  initialState,
  on(AppPageActions.setXlsxFileData, (state, { xlsxFileData }): AppState => {
    const tables = [...state.tables];
    tables.push(xlsxFileData);
    return {
      ...state,
      tables,
    };
  })
);
