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
    let sideNavPanelContent = structuredClone(state.sideNavPanelContent);

    currentTables.splice(tableIndex, 1);
    if (!currentTables.length) {
      sideNavPanelContent = null;
    }

    return {
      ...state,
      tables: currentTables,
      sideNavPanelContent,
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
  ),
  on(AppPageActions.calculateRowCountIf, (state, { rowCountIf }): AppState => {
    const {
      tableIndex,
      sheet,
      resultColumn,
      saveInTableColumn,
      criteria,
      fromColumnIndex,
      toColumnIndex,
    } = rowCountIf;
    const currentTables = structuredClone([...state.tables]);
    const currentTable = currentTables[tableIndex].fileData[sheet];
    let footer = currentTables[tableIndex].footers[sheet];

    if (!saveInTableColumn) {
      currentTables[tableIndex].columns[sheet].push(resultColumn);
    }

    footer[resultColumn] = 0;
    currentTable.forEach((row: any) => {
      let keyIndex = 0;
      row[resultColumn] = 0;

      for (const key in row) {
        if (
          keyIndex >= fromColumnIndex &&
          keyIndex <= toColumnIndex &&
          row[key] !== null &&
          criteria.includes(row[key].toUpperCase())
        ) {
          row[resultColumn]++;
          footer[resultColumn]++;
        }
        keyIndex++;
      }
    });

    return {
      ...state,
      tables: currentTables,
    };
  })
);
