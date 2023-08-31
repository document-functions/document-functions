import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentSplitterRoutingModule } from './document-splitter-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [CommonModule, DocumentSplitterRoutingModule],
})
export class DocumentSplitterModule {}
