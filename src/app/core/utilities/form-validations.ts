import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

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
  mainForm: UntypedFormGroup,
  translateService: TranslateService
): string {
  let message = "";
  if (mainForm.get(field).hasError("required")) {
    message = translateService.instant("VALIDATIONS.FIELD_REQUIRED");
  } else if (mainForm.get(field).hasError("pattern")) {
    message = translateService.instant("VALIDATIONS.FIELD_INVALID");
  } else if (mainForm.get(field).hasError("maxlength")) {
    const maxLength = mainForm.get(field)?.errors?.maxlength?.requiredLength;
    message = `${translateService.instant(
      "VALIDATIONS.FIELD_INVALID_MUST_BE"
    )} ${maxLength} ${translateService.instant(
      "VALIDATIONS.FIELD_LESS_CHARACTERS"
    )}`;
  } else if (mainForm.get(field).hasError("minlength")) {
    const minLength = mainForm.get(field)?.errors?.minlength?.requiredLength;
    message = `${translateService.instant(
      "VALIDATIONS.FIELD_INVALID_MUST_BE"
    )} ${minLength} ${translateService.instant(
      "VALIDATIONS.FIELD_MORE_CHARACTERS"
    )}`;
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

export const setValidatorDateDashboard = (
  mainForm: UntypedFormGroup,
  field: string,
  translateService: TranslateService
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    const dateTime = new Date(date).getTime();

    if (field === "startDate") {
      const endDateString = mainForm.get("endDate").value;
      const endDateTime = new Date(endDateString).getTime();
      if (dateTime > endDateTime) {
        return {
          lessThanOrEqualDate: translateService.instant(
            "VALIDATIONS.LESS_THAN_START_DATE"
          ),
        };
      }
    }
    if (field === "endDate") {
      const startDateString = mainForm.get("startDate").value;
      const startDateTime = new Date(startDateString).getTime();
      if (dateTime < startDateTime) {
        return {
          greaterOrEqualDate: translateService.instant(
            "VALIDATIONS.LESS_GREATER_END_DATE"
          ),
        };
      }
    }

    return null;
  };
};
