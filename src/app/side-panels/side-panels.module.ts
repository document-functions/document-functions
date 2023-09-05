import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCompareSideComponent } from './table-compare-side/table-compare-side.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DeleteDocumentsComponent } from './delete-documents/delete-documents.component';
import { RelationsComponent } from './relations/relations.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableCompareSideComponent,
    DeleteDocumentsComponent,
    RelationsComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [TableCompareSideComponent],
})
export class SidePanelsModule {}
