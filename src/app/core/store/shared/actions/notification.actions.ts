import { ErrorModel } from "@models/shared/error.model";
import { createAction, props } from "@ngrx/store";

export const setMessage = createAction(
  "[Notification/App] setMessage Notification",
  props<{ message: string }>()
);

export const setError = createAction(
  "[Notification/App] setError Notification",
  props<{ error: ErrorModel }>()
);

export const reset = createAction("[Notification] reset Notification");

export const resetLoading = createAction("[Notification] resetLoading Notification");
