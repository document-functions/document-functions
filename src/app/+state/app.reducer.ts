import { createReducer, on } from '@ngrx/store';
import { AppApiActions, AppPageActions } from './actions';
import { XlsxData } from '../models/xlsx-data';
import { SideNavPanelContents } from '../enums/side-nav-panel-contents';
import { RowCountCriteria } from '../models/row-count-criteria';
import { TableOperationsAction } from '../models/table-operations-action';
import { ColumnSumCriteria } from '../models/column-sum-criteria';

export interface AppState {
  tables: XlsxData[];
  activeTableIndex: number;
  sideNavPanelContent: SideNavPanelContents | null;
  rowCountCriteria: RowCountCriteria;
  columnSumCriteria: ColumnSumCriteria;
  isRuleLoading: boolean;
  tableOPerationsAction: TableOperationsAction;
}

export const initialState: AppState = {
  tables: [],
  activeTableIndex: -1,
  sideNavPanelContent: null,
  rowCountCriteria: {} as RowCountCriteria,
  columnSumCriteria: {} as ColumnSumCriteria,
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
      rowCountCriteria: {} as RowCountCriteria,
      columnSumCriteria: {} as ColumnSumCriteria,
      tables: currentTables,
      sideNavPanelContent,
    };
  }),
  on(AppPageActions.deleteAllTables, (state): AppState => {
    return {
      ...state,
      rowCountCriteria: {} as RowCountCriteria,
      columnSumCriteria: {} as ColumnSumCriteria,
      tables: [],
      sideNavPanelContent: null,
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
        rowCountCriteria: {} as RowCountCriteria,
        columnSumCriteria: {} as ColumnSumCriteria,
        tables: currentTables,
      };
    }
  ),
  on(
    AppPageActions.setRowCountCriteria,
    (state, { rowCountCriteria }): AppState => {
      return {
        ...state,
        rowCountCriteria,
      };
    }
  ),
  on(AppPageActions.clearRowCountCriteria, (state): AppState => {
    return {
      ...state,
      rowCountCriteria: {} as RowCountCriteria,
    };
  }),
  on(
    AppPageActions.setColumnSumCriteria,
    (state, { columnSumCriteria }): AppState => {
      return {
        ...state,
        columnSumCriteria,
      };
    }
  ),
  on(AppPageActions.clearColumnSumCriteria, (state): AppState => {
    return {
      ...state,
      columnSumCriteria: {} as ColumnSumCriteria,
    };
  }),
  on(AppPageActions.activateRuleLoader, (state): AppState => {
    return {
      ...state,
      isRuleLoading: true,
    };
  }),
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
      const range = columns.slice(fromColumnIndex, toColumnIndex + 1);
      const fromColumnName = columns[fromColumnIndex];
      const toColumnName = columns[toColumnIndex];

      if (!saveInTableColumn) {
        columns.push(resultColumn);
      }

      footer[resultColumn] = 0;
      currentTable.forEach((row: any) => {
        row[resultColumn] = 0;

        for (const key in row) {
          if (
            row[key] !== null &&
            key !== resultColumn &&
            key !== '#' &&
            range.includes(key) &&
            criteria.includes(row[key].toString().toUpperCase().trim())
          ) {
            row[resultColumn]++;
            footer[resultColumn]++;
          }
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
  ),
  on(
    AppPageActions.calculateColumnSumCriteria,
    (state, { columnSumCriteria }): AppState => {
      const currentTables = structuredClone([...state.tables]);
      const {
        tableIndex,
        sheet,
        columnCriteria,
        resultColumn,
        saveInTableColumn,
        addColAfterColIndex,

        targetTableIndex,
        targetSheet,
        targetColumnCriteria,
        targetColumnAdditionalCriteria,
        targetSumColumn,
      } = columnSumCriteria;

      const currentTable = currentTables[tableIndex].fileData[sheet];
      let currentFooter = currentTables[tableIndex].fileFooters[sheet];
      const currentColumns = currentTables[tableIndex].fileColumns[sheet];

      const targetTable = currentTables[targetTableIndex].fileData[targetSheet];

      if (!saveInTableColumn) {
        currentColumns.push(resultColumn);
      }

      currentFooter[resultColumn] = 0;
      currentTable.forEach((currentRow: any) => {
        currentRow[resultColumn] = 0;

        for (const currentKey in currentRow) {
          if (currentKey === columnCriteria) {
            targetTable.forEach((targetRow: any) => {
              for (const targetKey in targetRow) {
                if (
                  !targetColumnAdditionalCriteria?.length &&
                  targetKey === targetColumnCriteria &&
                  currentRow[currentKey] &&
                  targetRow[targetKey] &&
                  currentRow[currentKey]
                    .toString()
                    .replace(/^0+/, '')
                    .trim() ===
                    targetRow[targetKey].toString().replace(/^0+/, '').trim()
                ) {
                  if (!isNaN(Number(targetRow[targetSumColumn]))) {
                    if (targetRow[targetSumColumn] !== null) {
                      currentRow[resultColumn] =
                        (currentRow[resultColumn] || 0) +
                        parseFloat(targetRow[targetSumColumn]);

                      currentFooter[resultColumn] =
                        currentFooter[resultColumn] + currentRow[resultColumn];
                    }
                  }
                }
              }
            });
          }
        }
      });

      if (addColAfterColIndex) {
        const targetIndex = addColAfterColIndex + 1;
        const currentIndex = currentColumns.indexOf(resultColumn);

        if (currentIndex !== -1 && currentIndex !== targetIndex) {
          currentColumns.splice(currentIndex, 1);
          currentColumns.splice(targetIndex, 0, resultColumn);
        }
      }

      return {
        ...state,
        tables: currentTables,
        isRuleLoading: false,
      };
    }
  )
);
