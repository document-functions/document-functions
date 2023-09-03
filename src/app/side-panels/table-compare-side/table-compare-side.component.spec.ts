import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCompareSideComponent } from './table-compare-side.component';

describe('TableCompareSideComponent', () => {
  let component: TableCompareSideComponent;
  let fixture: ComponentFixture<TableCompareSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCompareSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCompareSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
