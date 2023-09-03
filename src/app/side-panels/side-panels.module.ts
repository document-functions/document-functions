import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCompareSideComponent } from './table-compare-side/table-compare-side.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [TableCompareSideComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [TableCompareSideComponent],
})
export class SidePanelsModule {}
