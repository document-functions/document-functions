import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table-operations',
  },
  {
    path: 'table-operations',
    loadChildren: () =>
      import('./table-operations/table-operations.module').then(
        (m) => m.TableOperationsModule
      ),
  },
  {
    path: 'document-splitter',
    loadChildren: () =>
      import('./document-splitter/document-splitter.module').then(
        (m) => m.DocumentSplitterModule
      ),
  },
  {
    path: '**',
    redirectTo: 'table-operations',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
