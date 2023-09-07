import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTableOperationsAction } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
import { TableOperationsActions } from 'src/app/enums/table-operations-actions';
import { TableOperationsAction } from 'src/app/models/table-operations-action';

@Component({
  selector: 'app-table-operations-layout',
  templateUrl: './table-operations-layout.component.html',
  styleUrls: ['./table-operations-layout.component.scss'],
})
export class TableOperationsLayoutComponent implements OnInit {
  getTableOperationsAction$ = new Observable<TableOperationsAction>();

  tableOperationActions = TableOperationsActions;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getTableOperationsAction$ = this.store.select(
      selectTableOperationsAction
    );
  }

  setTableOperationsAction(
    tabName: TableOperationsActions,
    isExpanded: boolean
  ) {
    this.store.dispatch(
      AppPageActions.setTableOperationsAction({ action: tabName, isExpanded })
    );
  }
}
