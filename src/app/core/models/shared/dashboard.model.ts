export interface SingleModel {
  name: string;
  value: number;
}

export interface MultiModel {
  name: string;
  series: SingleModel[];
}
