import { Component, OnInit } from '@angular/core';
import { Link } from './models/link';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SideNavPanelContents } from './enums/side-nav-panel-contents';
import { selectSideNavPanelContent } from './+state';
import { AppPageActions } from './+state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  getSideNavPanelContent$ = new Observable<SideNavPanelContents | null>();

  sideNavPanelContents = SideNavPanelContents;
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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getSideNavPanelContent$ = this.store.select(selectSideNavPanelContent);
  }

  onSideNavPanelClose() {
    this.store.dispatch(
      AppPageActions.setSideNavPanel({ sideNavPanelContent: null })
    );
  }
}
