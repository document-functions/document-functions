import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
  ],
})
export class AngularMaterialModule {}
