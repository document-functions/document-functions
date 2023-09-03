import { Component } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  links: Link[] = [
    {
      name: 'Compare tables',
      icon: 'compare',
      url: 'compare-table',
    },
    {
      name: 'Archive',
      icon: 'archive',
      url: 'archive',
    },
  ];
}
