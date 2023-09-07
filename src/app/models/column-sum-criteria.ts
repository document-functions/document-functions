import { ColumnSumTargetColumnCriteria } from './column-sum-target-column-criteria';

export interface ColumnSumCriteria {
  tableIndex: number;
  sheet: string;
  resultColumn: string;
  saveInTableColumn: boolean;
  addColAfterColIndex: number;

  targetTableIndex: number;
  targetSheet: string;
  targetColumnCriteria: ColumnSumTargetColumnCriteria[];
  targetSumColumn: string;
}
