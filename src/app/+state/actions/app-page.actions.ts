import { createAction, props } from '@ngrx/store';
import { SideNavPanelContents } from 'src/app/enums/side-nav-panel-contents';
import { XlsxData } from 'src/app/models/xlsx-data';

export const setXlsxFileData = createAction(
  '[Table compare PAGE] Set table data',
  props<{ xlsxFileData: XlsxData }>()
);

export const setTabIndex = createAction(
  '[Table compare PAGE] Set active index',
  props<{ activeTableIndex: number }>()
);

export const setSideNavPanel = createAction(
  '[Side nav PAGE] Set side nav panel',
  props<{ sideNavPanelContent: SideNavPanelContents | null }>()
);
