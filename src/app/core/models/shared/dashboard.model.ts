export interface SingleModel {
  name: string;
  value: number;
}

export interface MultiModel {
  name: string;
  series: SingleModel[];
}

export interface RangeDate {
  startDate: string;
  endDate: string;
}
