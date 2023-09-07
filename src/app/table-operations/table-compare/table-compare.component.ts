import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { Observable, map } from 'rxjs';
import { selectActiveTableIndex, selectTables } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
import { SideNavPanelContents } from 'src/app/enums/side-nav-panel-contents';
import { XlsxData } from 'src/app/models/xlsx-data';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-compare',
  templateUrl: './table-compare.component.html',
  styleUrls: ['./table-compare.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCompareComponent implements OnInit {
  getTables$ = new Observable<XlsxData[]>();
  getActiveTableIndex$ = new Observable<number>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getTables$ = this.store.select(selectTables).pipe(
      map((xlsxFileData) => {
        const tables = structuredClone(xlsxFileData);

        if (tables.length) {
          tables.forEach((table) => {
            table.fileSheets.forEach((sheet) => {
              table.fileData[sheet] = new TableVirtualScrollDataSource(
                table.fileData[sheet]
              );
            });
          });
        }

        return tables;
      })
    );
    this.getActiveTableIndex$ = this.store.select(selectActiveTableIndex);
  }

  convertXlsxToJson(ev: any) {
    const reader = new FileReader();
    const file = ev.target.files[0];
    const fileSheets: string[] = [];
    const fileColumns: any = {};
    const fileFooters: any = {};

    reader.onload = () => {
      const data = reader.result;
      const workBook = XLSX.read(data, { type: 'binary' });
      const jsonData = workBook.SheetNames.reduce(
        (initial: any, name: string) => {
          const sheet = workBook.Sheets[name];
          const sheetData = XLSX.utils.sheet_to_json(sheet, {
            raw: false,
            defval: null,
          });
          const sheetDataFirsElement: any = XLSX.utils.sheet_to_json(sheet, {
            raw: false,
            defval: null,
            header: 'A',
          })[0];
          const totals: any = {};
          const excludedCol = [
            '#',
            'egn',
            'егн',
            'лнч',
            'lnch',
            '№',
            'код',
            'code',
            'месец',
            'rc',
          ];

          fileColumns[name] = ['#'];
          for (const key in sheetDataFirsElement) {
            fileColumns[name].push(sheetDataFirsElement[key]);
          }

          initial[name] = sheetData;
          initial[name].forEach((tableRow: any, index: number) => {
            for (const key in tableRow) {
              let isColExcluded = new RegExp(excludedCol.join('|'), 'i').test(
                key
              );
              const value = tableRow[key];
              if (!isColExcluded) {
                if (!isNaN(Number(value))) {
                  if (value !== null) {
                    totals[key] = (totals[key] || 0) + parseFloat(value);
                  }
                } else {
                  excludedCol.push(key);
                  delete totals[key];
                }
              }
            }
            initial[name][index] = {
              '#': index + 1,
              ...tableRow,
            };
          });

          fileFooters[name] = totals;
          fileSheets.push(name);

          return initial;
        },
        {}
      );

      const xlsxFileData = {
        fileName: file.name,
        fileSheets,
        fileData: jsonData,
        fileColumns,
        fileFooters,
      };

      this.store.dispatch(AppPageActions.setXlsxFileData({ xlsxFileData }));
      ev.target.value = '';
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  }

  setTabIndex(activeTableIndex: number) {
    this.store.dispatch(AppPageActions.setTabIndex({ activeTableIndex }));
  }

  openSideNavPanel() {
    this.store.dispatch(
      AppPageActions.setSideNavPanel({
        sideNavPanelContent: SideNavPanelContents.TableCompare,
      })
    );
  }
}
