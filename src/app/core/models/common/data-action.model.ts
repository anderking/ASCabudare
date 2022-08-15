export interface DataActionModel<T> {
  url: string;
  collection?: string;
  payload?: T | T[];
}
