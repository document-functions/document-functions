import { Component } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
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
