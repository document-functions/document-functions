import { createReducer, on } from '@ngrx/store';
import { AppApiActions, AppPageActions } from './actions';
import { XlsxData } from '../models/xlsx-data';
import { SideNavPanelContents } from '../enums/side-nav-panel-contents';
import { RowCountCriteria } from '../models/row-count-criteria';
import { TableOperationsAction } from '../models/table-operations-action';

export interface AppState {
  tables: XlsxData[];
  activeTableIndex: number;
  sideNavPanelContent: SideNavPanelContents | null;
  rowCountCriteria: RowCountCriteria;
  isRuleLoading: boolean;
  tableOPerationsAction: TableOperationsAction;
}

export const initialState: AppState = {
  tables: [],
  activeTableIndex: -1,
  sideNavPanelContent: null,
  rowCountCriteria: {} as RowCountCriteria,
  isRuleLoading: false,
  tableOPerationsAction: {} as TableOperationsAction,
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
  on(
    AppPageActions.setTableOperationsAction,
    (state, { action, isExpanded }): AppState => {
      const updatedAction = structuredClone({ ...state.tableOPerationsAction });
      updatedAction[action] = isExpanded;

      return {
        ...state,
        tableOPerationsAction: updatedAction,
      };
    }
  ),
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
    AppPageActions.setRowCountCriteria,
    (state, { rowCountCriteria }): AppState => {
      return {
        ...state,
        rowCountCriteria,
      };
    }
  ),
  on(AppPageActions.activateRuleLoader, (state): AppState => {
    return {
      ...state,
      isRuleLoading: true,
    };
  }),
  on(AppPageActions.clearRowCountCriteria, (state): AppState => {
    return {
      ...state,
      rowCountCriteria: {} as RowCountCriteria,
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
  on(
    AppPageActions.calculateRowCountCriteria,
    (state, { rowCountCriteria }): AppState => {
      const updatedRowCountCriteria = structuredClone(rowCountCriteria);
      const {
        tableIndex,
        sheet,
        resultColumn,
        saveInTableColumn,
        criteria,
        fromColumnIndex,
        toColumnIndex,
        addColAfterColIndex,
      } = updatedRowCountCriteria;
      const currentTables = structuredClone([...state.tables]);
      const currentTable = currentTables[tableIndex].fileData[sheet];
      let footer = currentTables[tableIndex].fileFooters[sheet];
      const columns = currentTables[tableIndex].fileColumns[sheet];
      const fromColumnName = columns[fromColumnIndex];
      const toColumnName = columns[toColumnIndex];
      const range = columns.slice(fromColumnIndex, toColumnIndex + 1);

      if (!saveInTableColumn) {
        columns.push(resultColumn);
      }

      footer[resultColumn] = 0;
      currentTable.forEach((row: any) => {
        let index = 0;
        row[resultColumn] = 0;

        for (const key in row) {
          if (
            row[key] !== null &&
            key !== resultColumn &&
            key !== '#' &&
            range.includes(key) &&
            criteria.includes(row[key].toString().toUpperCase())
          ) {
            row[resultColumn]++;
            footer[resultColumn]++;
          }
          index++;
        }
      });

      if (addColAfterColIndex) {
        const targetIndex = addColAfterColIndex + 1;
        const currentIndex = columns.indexOf(resultColumn);

        if (currentIndex !== -1 && currentIndex !== targetIndex) {
          columns.splice(currentIndex, 1);
          columns.splice(targetIndex, 0, resultColumn);

          updatedRowCountCriteria.fromColumnIndex =
            columns.indexOf(fromColumnName);
          updatedRowCountCriteria.toColumnIndex = columns.indexOf(toColumnName);
        }
      }

      return {
        ...state,
        tables: currentTables,
        rowCountCriteria: updatedRowCountCriteria,
        isRuleLoading: false,
      };
    }
  )
);
