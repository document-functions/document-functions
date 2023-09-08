import { ColumnSumTargetColumnCriteria } from './column-sum-target-column-criteria';

export interface ColumnSumCriteria {
  tableIndex: number;
  sheet: string;
  columnCriteria: string;
  resultColumn: string;
  saveInTableColumn: boolean;
  addColAfterColIndex: number;

  targetTableIndex: number;
  targetSheet: string;
  targetColumnCriteria: string;
  targetColumnAdditionalCriteria: ColumnSumTargetColumnCriteria[];
  targetSumColumn: string;
}
