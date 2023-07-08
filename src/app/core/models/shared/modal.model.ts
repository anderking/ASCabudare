export interface ModalModel<T> {
  type: "confirmation" | "information";
  item: T;
  title: string;
  message: string;
  buttonYes: string;
  buttonCancel: string;
}
