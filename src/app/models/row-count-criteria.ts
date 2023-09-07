export interface RowCountCriteria {
  tableIndex: number;
  sheet: string;
  resultColumn: string;
  saveInTableColumn: boolean;
  criteria: string[];
  fromColumnIndex: number;
  toColumnIndex: number;
  addColAfterColIndex: number;
}
