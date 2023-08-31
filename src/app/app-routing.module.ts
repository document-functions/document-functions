import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table-checker',
  },
  {
    path: 'table-checker',
    loadChildren: () =>
      import('./table-checker/table-checker.module').then(
        (m) => m.TableCheckerModule
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
    redirectTo: 'table-checker',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
