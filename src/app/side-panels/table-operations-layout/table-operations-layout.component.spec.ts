import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperationsLayoutComponent } from './table-operations-layout.component';

describe('TableOperationsLayoutComponent', () => {
  let component: TableOperationsLayoutComponent;
  let fixture: ComponentFixture<TableOperationsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableOperationsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableOperationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
