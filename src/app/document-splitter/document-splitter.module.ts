import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentSplitterRoutingModule } from './document-splitter-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [CommonModule, DocumentSplitterRoutingModule],
})
export class DocumentSplitterModule {}
