import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

export function isValidField(
  field: string,
  mainForm: UntypedFormGroup
): boolean {
  return (
    (mainForm.get(field)?.touched || mainForm.get(field)?.dirty) &&
    !mainForm.get(field)?.valid
  );
}

export function getErrorMessageField(
  field: string,
  mainForm: UntypedFormGroup
): string {
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
  } else if (mainForm.get(field).hasError("greaterOrEqualDate")) {
    const greaterOrEqualDate = mainForm.get(field)?.errors?.greaterOrEqualDate;
    message = greaterOrEqualDate;
  } else if (mainForm.get(field).hasError("lessThanOrEqualDate")) {
    const lessThanOrEqualDate =
      mainForm.get(field)?.errors?.lessThanOrEqualDate;
    message = lessThanOrEqualDate;
  }
  return message;
}

export class ValidationsCustom {
  public static setValidatorDateDashboard(
    mainForm: UntypedFormGroup,
    field: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value + "T04:00:00.000Z";
      const dateTime = new Date(date).getTime();

      if (field === "startDate") {
        const endDateString = mainForm.get("endDate").value + "T04:00:00.000Z";
        const endDateTime = new Date(endDateString).getTime();
        if (dateTime > endDateTime) {
          return {
            lessThanOrEqualDate:
              "The start date must be less than or equal to the end date.",
          };
        }
      }
      if (field === "endDate") {
        const startDateString =
          mainForm.get("startDate").value + "T04:00:00.000Z";
        const startDateTime = new Date(startDateString).getTime();
        if (dateTime < startDateTime) {
          return {
            greaterOrEqualDate:
              "The end date must be greater than or equal to the start date.",
          };
        }
      }

      return null;
    };
  }
}
