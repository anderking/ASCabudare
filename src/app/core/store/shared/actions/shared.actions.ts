import { ErrorModel } from "@models/shared/error.model";
import { createAction, props } from "@ngrx/store";

export const setMessage = createAction(
  "[Notification/App] Set Message",
  props<{ message: string }>()
);
export const setError = createAction(
  "[Notification/App] Set Error",
  props<{ error: ErrorModel }>()
);

export const clear = createAction("[Shared] Clear Shared");

export const resetLoading = createAction("[Shared] Reset Loading Success");
