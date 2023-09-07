import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableOperationsRoutingModule } from './table-oeprations-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TableCompareComponent } from './table-compare/table-compare.component';
import { TableArchiveComponent } from './table-archive/table-archive.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [LayoutComponent, TableCompareComponent, TableArchiveComponent],
  imports: [
    CommonModule,
    TableOperationsRoutingModule,
    AngularMaterialModule,
    ScrollingModule,
  ],
})
export class TableOperationsModule {}
