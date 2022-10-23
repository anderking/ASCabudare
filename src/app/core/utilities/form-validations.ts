import { UntypedFormGroup } from "@angular/forms";

export function isValidField(field: string, mainForm: UntypedFormGroup): boolean {
  return (
    (mainForm.get(field)?.touched || mainForm.get(field)?.dirty) &&
    !mainForm.get(field)?.valid
  );
}

export function getErrorMessageField(field: string, mainForm: UntypedFormGroup): string {
  let message = "";
  if (mainForm.get(field).errors.required) {
    message = "Field required";
  } else if (mainForm.get(field).hasError("pattern")) {
    message = "Field invalid";
  } else if (mainForm.get(field).hasError("maxlength")) {
    const maxLength = mainForm.get(field)?.errors?.maxlength?.requiredLength;
    message = "Field invalid, must be " + maxLength + " or less characters";
  } else if (mainForm.get(field).hasError("minlength")) {
    const minLength = mainForm.get(field)?.errors?.minlength?.requiredLength;
    message = "Field invalid, must be " + minLength + " or less characters";
  }
  return message;
}
