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
      name: 'Operations',
      icon: 'compare',
      url: 'operations',
    },
    {
      name: 'Archive',
      icon: 'archive',
      url: 'archive',
    },
  ];
}
