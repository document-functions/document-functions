import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { Observable, map } from 'rxjs';
import { selectActiveTableIndex, selectTables } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
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

  uploadXlsx(ev: any) {
    const reader = new FileReader();
    const file = ev.target.files[0];
    const sheets: string[] = [];
    const columns: any = {};

    reader.onload = () => {
      const data = reader.result;
      const workBook = XLSX.read(data, { type: 'binary' });
      const jsonData = workBook.SheetNames.reduce(
        (initial: any, name: string) => {
          sheets.push(name);
          const sheet = workBook.Sheets[name];
          const sheetData = XLSX.utils.sheet_to_json(sheet);
          const sheetDataWithIndex = sheetData.map(
            (row: any, index: number) => ({
              '#': index + 1,
              ...row,
            })
          );

          initial[name] = sheetDataWithIndex;

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

  getTotal(tableData: any) {
    console.log(tableData);

    return 0;

    // return tableData
    //   .map((data: any) => data)
    //   .reduce((acc: any, value: any) => acc + value, 0);
  }
}
