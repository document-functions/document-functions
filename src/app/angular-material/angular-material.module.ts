import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    TableVirtualScrollModule,
    MatSidenavModule,
  ],
})
export class AngularMaterialModule {}
