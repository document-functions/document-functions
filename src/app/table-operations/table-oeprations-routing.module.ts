import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TableCompareComponent } from './table-compare/table-compare.component';
import { TableArchiveComponent } from './table-archive/table-archive.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'operations',
      },
      {
        path: 'operations',
        component: TableCompareComponent,
      },
      {
        path: 'archive',
        component: TableArchiveComponent,
      },
      {
        path: '**',
        redirectTo: 'operations',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableOperationsRoutingModule {}
