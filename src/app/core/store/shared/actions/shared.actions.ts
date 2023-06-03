import { ErrorModel } from "@models/shared/error.model";
import { createAction, props } from "@ngrx/store";

export const setMessage = createAction(
  "[Notification/App] setMessage Shared",
  props<{ message: string }>()
);
export const setError = createAction(
  "[Notification/App] setError Shared",
  props<{ error: ErrorModel }>()
);

export const reset = createAction("[Shared] reset Shared");

export const resetLoading = createAction("[Shared] resetLoading Shared");
