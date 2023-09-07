import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectRowCountCriteria, selectTables } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
import { RowCountCriteria } from 'src/app/models/row-count-criteria';
import { XlsxData } from 'src/app/models/xlsx-data';
import { AppValidatorsService } from 'src/app/validators/app.validators.service';

@Component({
  selector: 'app-table-operations-count-in-row',
  templateUrl: './table-operations-count-in-row.component.html',
  styleUrls: ['./table-operations-count-in-row.component.scss'],
})
export class TableOperationsCountInRowComponent implements OnInit, OnDestroy {
  getTables$ = new Observable<XlsxData[]>();
  getRowCountCriteria$ = new Observable<RowCountCriteria>();

  rowCountCriteriaForm = this.fb.group({
    tableIndex: [null, Validators.required],
    sheet: [null, Validators.required],
    resultColumn: [
      null,
      {
        validators: [Validators.required],
        // asyncValidators: [this.appValidatorsService.checkValueInArray()], // TODO
      },
    ],
    saveInTableColumn: true,
    criteria: this.fb.array([], Validators.required),
    fromColumnIndex: [null, Validators.required],
    toColumnIndex: [null, [Validators.required]],
    addColAfterColIndex: null,
  });
  get tableIndexField() {
    return this.rowCountCriteriaForm.get('tableIndex') as FormControl<any>;
  }
  get sheetField() {
    return this.rowCountCriteriaForm.get('sheet') as FormControl<string | null>;
  }
  get saveInTableColumnField() {
    return this.rowCountCriteriaForm.get(
      'saveInTableColumn'
    ) as FormControl<boolean>;
  }
  get criteriaFields() {
    return this.rowCountCriteriaForm.get('criteria') as FormArray<any>;
  }
  private get resultColumnField() {
    return this.rowCountCriteriaForm.get('resultColumn') as FormControl<
      string | null
    >;
  }
  private get fromColumnIndexField() {
    return this.rowCountCriteriaForm.get('fromColumnIndex') as FormControl<
      string | null
    >;
  }
  private get toColumnIndexField() {
    return this.rowCountCriteriaForm.get('toColumnIndex') as FormControl<
      string | null
    >;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appValidatorsService: AppValidatorsService
  ) {}

  ngOnInit(): void {
    this.getTables$ = this.store.select(selectTables);
    this.getRowCountCriteria$ = this.store.select(selectRowCountCriteria).pipe(
      tap((row) => {
        const { criteria } = row;

        this.rowCountCriteriaForm.patchValue(row as any);

        if (criteria?.length) {
          this.criteriaFields.clear();
          criteria.forEach((crit: string) => {
            this.criteriaFields.push(this.fb.control(crit));
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    const rowCountCriteria = this.rowCountCriteriaForm.getRawValue() as any;
    this.store.dispatch(
      AppPageActions.setRowCountCriteria({ rowCountCriteria })
    );
  }

  submitForm() {
    if (this.rowCountCriteriaForm.valid) {
      const rowCountCriteria = this.rowCountCriteriaForm.getRawValue() as any;

      this.store.dispatch(AppPageActions.activateRuleLoader());
      this.store.dispatch(
        AppPageActions.calculateRowCountCriteria({ rowCountCriteria })
      );
    }
  }

  resetForm() {
    this.rowCountCriteriaForm.reset({ saveInTableColumn: true });
    this.criteriaFields.value.forEach(() => {
      this.removeCriteria(0);
    });

    this.store.dispatch(AppPageActions.clearRowCountCriteria());
  }

  resetRelatedFields() {
    this.sheetField.reset();
    this.resultColumnField.reset();
    this.fromColumnIndexField.reset();
    this.toColumnIndexField.reset();
  }

  toggleSaveColumn() {
    this.saveInTableColumnField.setValue(!this.saveInTableColumnField.value);
    this.resultColumnField.reset();
  }

  addCriteria(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.criteriaFields.push(this.fb.control(value.toUpperCase()));
    }

    event.chipInput!.clear();
  }

  removeCriteria(criteriaIndex: number) {
    this.criteriaFields.removeAt(criteriaIndex);
  }
}
