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
    const sheets: string[] = [];
    const columns: any = {};
    const footers: any = {};

    reader.onload = () => {
      const data = reader.result;
      const workBook = XLSX.read(data, { type: 'binary' });
      const jsonData = workBook.SheetNames.reduce(
        (initial: any, name: string) => {
          sheets.push(name);
          const sheet = workBook.Sheets[name];
          const sheetData = XLSX.utils.sheet_to_json(sheet, {
            raw: false,
            defval: null,
          });

          initial[name] = sheetData;
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
          initial[name].forEach((tableRow: any, index: number) => {
            for (const key in tableRow) {
              let isColExcluded = new RegExp(excludedCol.join('|'), 'i').test(
                key
              );

              if (!isColExcluded) {
                let value = tableRow[key];

                if (typeof value === 'number' || !isNaN(value)) {
                  if (value === null) {
                    value = 0;
                  }
                  totals[key] = (totals[key] || 0) + parseFloat(value);
                  if (totals[key] === 0) {
                    delete totals[key];
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
          footers[name] = totals;

          if (initial[name].length) {
            columns[name] = Object.keys(initial[name][0]);
          }

          return initial;
        },
        {}
      );

      const xlsxFileData = {
        fileName: file.name,
        fileSheets: sheets,
        fileData: jsonData,
        columns,
        footers,
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
