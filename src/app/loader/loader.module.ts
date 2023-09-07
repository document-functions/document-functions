import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}
