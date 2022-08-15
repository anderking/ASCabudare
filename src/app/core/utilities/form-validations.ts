import { FormGroup } from "@angular/forms";

export function isValidField(field: string, mainForm: FormGroup): boolean {
  return (
    (mainForm.get(field)?.touched || mainForm.get(field)?.dirty) &&
    !mainForm.get(field)?.valid
  );
}

export function getErrorMessageField(field: string, mainForm: FormGroup): string {
  let message: string = "";
  if (mainForm.get(field).errors.required) {
    message = "Field required";
  } else if (mainForm.get(field).hasError("pattern")) {
    message = "Field invalid";
  } else if (mainForm.get(field).hasError("maxlength")) {
    let maxLength = mainForm.get(field)?.errors?.maxlength?.requiredLength;
    message = "Field invalid, must be " + maxLength + " or less characters";
  } else if (mainForm.get(field).hasError("minlength")) {
    let minLength = mainForm.get(field)?.errors?.minlength?.requiredLength;
    message = "Field invalid, must be " + minLength + " or less characters";
  }
  return message;
}
