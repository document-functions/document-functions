import { createReducer, on } from '@ngrx/store';
import { AppApiActions, AppPageActions } from './actions';
import { XlsxData } from '../models/xlsx-data';
import { SideNavPanelContents } from '../enums/side-nav-panel-contents';

export interface AppState {
  tables: XlsxData[];
  activeTableIndex: number;
  sideNavPanelContent: SideNavPanelContents | null;
}

export const initialState: AppState = {
  tables: [],
  activeTableIndex: -1,
  sideNavPanelContent: null,
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
  }),
  on(AppPageActions.setTabIndex, (state, { activeTableIndex }): AppState => {
    return {
      ...state,
      activeTableIndex,
    };
  }),
  on(
    AppPageActions.setSideNavPanel,
    (state, { sideNavPanelContent }): AppState => {
      return {
        ...state,
        sideNavPanelContent,
      };
    }
  ),
  on(AppPageActions.deleteAllTables, (state): AppState => {
    return {
      ...state,
      tables: [],
      sideNavPanelContent: null,
    };
  }),
  on(AppPageActions.deleteTable, (state, { tableIndex }): AppState => {
    const currentTables = structuredClone([...state.tables]);
    currentTables.splice(tableIndex, 1);

    return {
      ...state,
      tables: currentTables,
    };
  }),
  on(
    AppPageActions.deleteSheet,
    (state, { tableIndex, sheetIndex, sheetName }): AppState => {
      const currentTables = structuredClone([...state.tables]);
      const currentTable = currentTables[tableIndex];

      currentTable.fileSheets.splice(sheetIndex, 1);
      delete currentTable.fileData[sheetName];
      delete currentTable.footers[sheetName];
      if (currentTable.columns[sheetName]) {
        delete currentTable.columns[sheetName];
      }

      return {
        ...state,
        tables: currentTables,
      };
    }
  )
);
