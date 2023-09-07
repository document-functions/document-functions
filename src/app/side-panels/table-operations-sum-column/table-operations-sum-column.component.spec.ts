import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperationsSumColumnComponent } from './table-operations-sum-column.component';

describe('TableOperationsSumColumnComponent', () => {
  let component: TableOperationsSumColumnComponent;
  let fixture: ComponentFixture<TableOperationsSumColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOperationsSumColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOperationsSumColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
