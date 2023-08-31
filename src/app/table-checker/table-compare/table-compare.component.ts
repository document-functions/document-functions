import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTables } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
import { XlsxData } from 'src/app/models/xlsx-data';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-compare',
  templateUrl: './table-compare.component.html',
  styleUrls: ['./table-compare.component.scss'],
})
export class TableCompareComponent implements OnInit {
  getTables$ = new Observable<XlsxData[]>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getTables$ = this.store.select(selectTables);
  }

  uploadXlsx(ev: any) {
    // TODO
    console.log('loading');

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
          initial[name] = XLSX.utils.sheet_to_json(sheet);

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
      console.log('not loading');
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  }
}
