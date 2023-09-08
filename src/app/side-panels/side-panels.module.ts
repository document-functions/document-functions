import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOperationsLayoutComponent } from './table-operations-layout/table-operations-layout.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TableOperationsDeleteDocumentsComponent } from './table-operations-delete-documents/table-operations-delete-documents.component';
import { TableOperationsCountInRowComponent } from './table-operations-count-in-row/table-operations-count-in-row.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableOperationsSumColumnComponent } from './table-operations-sum-column/table-operations-sum-column.component';
import { UniquePipe } from '../pipes/unicue.pipe';

@NgModule({
  declarations: [
    TableOperationsLayoutComponent,
    TableOperationsDeleteDocumentsComponent,
    TableOperationsCountInRowComponent,
    TableOperationsSumColumnComponent,
    UniquePipe,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [TableOperationsLayoutComponent],
})
export class SidePanelsModule {}
