import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectColumnSumCriteria, selectTables } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
import { ColumnSumCriteria } from 'src/app/models/column-sum-criteria';
import { ColumnSumTargetColumnCriteria } from 'src/app/models/column-sum-target-column-criteria';
import { XlsxData } from 'src/app/models/xlsx-data';

@Component({
  selector: 'app-table-operations-sum-column',
  templateUrl: './table-operations-sum-column.component.html',
  styleUrls: ['./table-operations-sum-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOperationsSumColumnComponent implements OnInit, OnDestroy {
  getTables$ = new Observable<XlsxData[]>();
  getColumnSumCriteria$ = new Observable<ColumnSumCriteria>();

  constructor(private fb: FormBuilder, private store: Store) {}

  sumColumnCriteriaForm = this.fb.group({
    tableIndex: [null, Validators.required],
    sheet: [null, Validators.required],
    columnCriteria: [null, Validators.required],
    resultColumn: [null, Validators.required],
    saveInTableColumn: true,
    addColAfterColIndex: null,

    targetTableIndex: [null, Validators.required],
    targetSheet: [null, Validators.required],
    targetSumColumn: [null, Validators.required],
    targetColumnCriteria: this.fb.array([
      this.fb.group({
        targetColumnCriteria: [null, Validators.required],
        targetColumnCustomCriteria: null,
      }),
    ]),
  });
  get tableIndexField() {
    return this.sumColumnCriteriaForm.get('tableIndex') as FormControl<any>;
  }
  get sheetField() {
    return this.sumColumnCriteriaForm.get('sheet') as FormControl<
      string | null
    >;
  }
  get columnCriteriaField() {
    return this.sumColumnCriteriaForm.get('columnCriteria') as FormControl<
      string | null
    >;
  }
  get saveInTableColumnField() {
    return this.sumColumnCriteriaForm.get(
      'saveInTableColumn'
    ) as FormControl<boolean>;
  }
  private get resultColumnField() {
    return this.sumColumnCriteriaForm.get('resultColumn') as FormControl<
      string | null
    >;
  }

  get targetTableIndexField() {
    return this.sumColumnCriteriaForm.get(
      'targetTableIndex'
    ) as FormControl<any>;
  }
  get targetSheetField() {
    return this.sumColumnCriteriaForm.get('targetSheet') as FormControl<
      string | null
    >;
  }
  private get targetSumColumnField() {
    return this.sumColumnCriteriaForm.get('targetSumColumn') as FormControl<
      string | null
    >;
  }
  get targetColumnCriteriaFields() {
    return this.sumColumnCriteriaForm.get('targetColumnCriteria') as any;
  }

  ngOnInit(): void {
    this.getTables$ = this.store.select(selectTables);
    this.getColumnSumCriteria$ = this.store
      .select(selectColumnSumCriteria)
      .pipe(
        tap((row) => {
          const { targetColumnCriteria } = row;

          this.sumColumnCriteriaForm.patchValue(row as any);

          if (targetColumnCriteria?.length) {
            this.targetColumnCriteriaFields.clear();
            targetColumnCriteria.forEach(
              (criteria: ColumnSumTargetColumnCriteria) => {
                this.addTargetCriteria(criteria);
              }
            );
          }
        })
      );
  }

  ngOnDestroy(): void {
    const columnSumCriteria = this.sumColumnCriteriaForm.getRawValue() as any;
    this.store.dispatch(
      AppPageActions.setColumnSumCriteria({ columnSumCriteria })
    );
  }

  submitForm() {
    if (this.sumColumnCriteriaForm.valid) {
      const columnSumCriteria = this.sumColumnCriteriaForm.getRawValue() as any;

      this.store.dispatch(AppPageActions.activateRuleLoader());
      this.store.dispatch(
        AppPageActions.calculateColumnSumCriteria({ columnSumCriteria })
      );
    }
  }

  resetForm() {
    this.sumColumnCriteriaForm.reset({ saveInTableColumn: true });
    this.resetTargetCriteria();

    this.store.dispatch(AppPageActions.clearColumnSumCriteria());
  }

  resetRelatedFields() {
    this.sheetField.reset();
    this.columnCriteriaField.reset();
    this.resultColumnField.reset();
  }

  resetTargetRelatedFields() {
    this.targetSheetField.reset();
    this.targetSumColumnField.reset();
    this.resetTargetCriteria();
  }

  toggleSaveColumn() {
    this.saveInTableColumnField.setValue(!this.saveInTableColumnField.value);
    this.resultColumnField.reset();
  }

  addTargetCriteria(customCriteria?: ColumnSumTargetColumnCriteria) {
    const criteriaForm = this.fb.group({
      targetColumnCriteria: [
        customCriteria ? customCriteria.targetColumnCriteria : null,
        Validators.required,
      ],
      targetColumnCustomCriteria: customCriteria
        ? customCriteria.targetColumnCustomCriteria
        : null,
    });

    this.targetColumnCriteriaFields.push(criteriaForm);
  }

  deleteTargetCriteria(index: number) {
    this.targetColumnCriteriaFields.removeAt(index);
  }

  private resetTargetCriteria() {
    this.targetColumnCriteriaFields.clear();
    this.addTargetCriteria();
  }
}
