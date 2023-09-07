import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperationsCountInRowComponent } from './table-operations-count-in-row.component';

describe('TableOperationsCountInRowComponent', () => {
  let component: TableOperationsCountInRowComponent;
  let fixture: ComponentFixture<TableOperationsCountInRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOperationsCountInRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOperationsCountInRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
