import { Component } from '@angular/core';
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
}
