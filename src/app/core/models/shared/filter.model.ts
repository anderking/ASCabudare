export interface RangeDate {
  startDate: string;
  endDate: string;
}

export interface CurrentFilterModel {
  rangeDate: RangeDate;
  wordFilter: string;
}
