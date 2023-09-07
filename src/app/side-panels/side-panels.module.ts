import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOperationsLayoutComponent } from './table-operations-layout/table-operations-layout.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TableOperationsDeleteDocumentsComponent } from './table-operations-delete-documents/table-operations-delete-documents.component';
import { TableOperationsCountInRowComponent } from './table-operations-count-in-row/table-operations-count-in-row.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableOperationsLayoutComponent,
    TableOperationsDeleteDocumentsComponent,
    TableOperationsCountInRowComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [TableOperationsLayoutComponent],
})
export class SidePanelsModule {}
