import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperationsDeleteDocumentsComponent } from './table-operations-delete-documents.component';

describe('TableOperationsDeleteDocumentsComponent', () => {
  let component: TableOperationsDeleteDocumentsComponent;
  let fixture: ComponentFixture<TableOperationsDeleteDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableOperationsDeleteDocumentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableOperationsDeleteDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
