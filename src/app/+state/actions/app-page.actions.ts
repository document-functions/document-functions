import { createAction, props } from '@ngrx/store';
import { XlsxData } from 'src/app/models/xlsx-data';

export const setXlsxFileData = createAction(
  '[Table compare PAGE] Set table data',
  props<{ xlsxFileData: XlsxData }>()
);

export const setTabIndex = createAction(
  '[Table compare PAGE] Set active index',
  props<{ activeTableIndex: number }>()
);
