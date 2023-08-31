import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TableCompareComponent } from './table-compare/table-compare.component';
import { TableArchiveComponent } from './table-archive/table-archive.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'compare-table',
      },
      {
        path: 'compare-table',
        component: TableCompareComponent,
      },
      {
        path: 'archive',
        component: TableArchiveComponent,
      },
      {
        path: '**',
        redirectTo: 'compare-table',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableCheckerRoutingModule {}
