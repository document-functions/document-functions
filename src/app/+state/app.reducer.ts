import { createReducer, on } from '@ngrx/store';
import { AppApiActions, AppPageActions } from './actions';
import { XlsxData } from '../models/xlsx-data';
import { SideNavPanelContents } from '../enums/side-nav-panel-contents';
import { RowCountIf } from '../models/row-count-if';

export interface AppState {
  tables: XlsxData[];
  activeTableIndex: number;
  sideNavPanelContent: SideNavPanelContents | null;
  rowCountIf: RowCountIf;
}

export const initialState: AppState = {
  tables: [],
  activeTableIndex: -1,
  sideNavPanelContent: null,
  rowCountIf: {} as RowCountIf,
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
    AppPageActions.setRowCountIf,
    AppPageActions.calculateRowCountIf,
    (state, { rowCountIf }): AppState => {
      return {
        ...state,
        rowCountIf,
      };
    }
  ),
  on(AppPageActions.clearRowCountIf, (state): AppState => {
    return {
      ...state,
      rowCountIf: {} as RowCountIf,
    };
  }),
  on(
    AppPageActions.deleteSheet,
    (state, { tableIndex, sheetIndex, sheetName }): AppState => {
      const currentTables = structuredClone([...state.tables]);
      const currentTable = currentTables[tableIndex];

      currentTable.fileSheets.splice(sheetIndex, 1);
      delete currentTable.fileData[sheetName];
      delete currentTable.fileFooters[sheetName];
      if (currentTable.fileColumns[sheetName]) {
        delete currentTable.fileColumns[sheetName];
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
    let footer = currentTables[tableIndex].fileFooters[sheet];
    const columns = currentTables[tableIndex].fileColumns[sheet];
    const range = columns.slice(fromColumnIndex, toColumnIndex + 1);

    if (!saveInTableColumn) {
      currentTables[tableIndex].fileColumns[sheet].push(resultColumn);
    }

    footer[resultColumn] = 0;
    currentTable.forEach((row: any) => {
      let index = 0;
      row[resultColumn] = 0;

      for (const key in row) {
        if (
          row[key] !== null &&
          key !== resultColumn &&
          range.includes(key) &&
          criteria.includes(row[key].toUpperCase())
        ) {
          row[resultColumn]++;
          footer[resultColumn]++;
        }
        index++;
      }
    });

    return {
      ...state,
      tables: currentTables,
    };
  })
);
