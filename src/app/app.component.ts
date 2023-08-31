import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Link } from './models/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  links: Link[] = [
    {
      name: 'Table checker',
      icon: 'table_chart',
      url: 'table-checker',
    },
    {
      name: 'Document splitter',
      icon: 'file_copy',
      url: 'document-splitter',
    },
  ];

  displayedColumns = ['header 1', 'header 2'];
  dataSource = [
    {
      'header 1': 'info1.1',
      'header 2': 'info1.2',
    },
    {
      'header 1': 'nfo2.1',
      'header 2': 'nfo2.2',
    },
  ];

  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);

      console.log(dataString);
    };
    reader.readAsBinaryString(file);
  }
}
