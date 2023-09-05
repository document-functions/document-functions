import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTables } from 'src/app/+state';
import { AppPageActions } from 'src/app/+state/actions';
import { XlsxData } from 'src/app/models/xlsx-data';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss'],
})
export class RelationsComponent implements OnInit {
  getTables$ = new Observable<XlsxData[]>();

  countIfForm = this.fb.group({
    tableIndex: [null, Validators.required],
    sheet: [null, Validators.required],
    resultColumn: [null, Validators.required],
    saveInTableColumn: true,
    criteria: this.fb.array([], Validators.required),
    fromColumnIndex: [null, Validators.required],
    toColumnIndex: [null, Validators.required],
  });
  get tableIndexField() {
    return this.countIfForm.get('tableIndex') as FormControl<any>;
  }
  get sheetField() {
    return this.countIfForm.get('sheet') as FormControl<string | null>;
  }
  get saveInTableColumnField() {
    return this.countIfForm.get('saveInTableColumn') as FormControl<boolean>;
  }
  get criteriaFields() {
    return this.countIfForm.get('criteria') as FormArray<any>;
  }
  private get resultColumnField() {
    return this.countIfForm.get('resultColumn') as FormControl<string | null>;
  }
  private get fromColumnIndexField() {
    return this.countIfForm.get('fromColumnIndex') as FormControl<
      string | null
    >;
  }
  private get toColumnIndexField() {
    return this.countIfForm.get('toColumnIndex') as FormControl<string | null>;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.getTables$ = this.store.select(selectTables);
  }

  submitCountIfForm() {
    const rowCountIf = this.countIfForm.getRawValue() as any;
    this.store.dispatch(AppPageActions.calculateRowCountIf({ rowCountIf }));
  }

  resetCountIfForm() {
    this.countIfForm.reset();
    this.criteriaFields.value.forEach(() => {
      this.removeCriteria(0);
    });
  }

  resetRelatedFields() {
    this.sheetField.reset();
    this.resultColumnField.reset();
    this.fromColumnIndexField.reset();
    this.toColumnIndexField.reset();
  }

  toggleSaveColumn() {
    this.saveInTableColumnField.setValue(!this.saveInTableColumnField.value);
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
