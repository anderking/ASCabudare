import { DataActionModel } from "@models/common/data-action.model";
import {
  LoginFormModel,
  CurrentUserModel,
  UserAuthModel,
} from "@models/auth/current-user.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Auth] login Auth",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const loginSucess = createAction(
  "[Auth] loginSucess Auth",
  props<{ userAuth: UserAuthModel | CurrentUserModel }>()
);

export const loginGoogle = createAction(
  "[Auth] loginGoogle Auth",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const loginGoogleSucess = createAction(
  "[Auth] loginGoogleSucess Auth",
  props<{ userAuth: UserAuthModel }>()
);

export const register = createAction(
  "[Auth] register Auth",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const registerSucess = createAction(
  "[Auth] registerSucess Auth",
  props<{ userAuth: UserAuthModel }>()
);

export const setUserDoc = createAction(
  "[Auth] setUserDoc Auth",
  props<{ action: DataActionModel<CurrentUserModel> }>()
);

export const setUserDocSuccess = createAction(
  "[Auth] setUserDocSuccess Auth",
  props<{ userDoc: CurrentUserModel }>()
);

export const updateProfile = createAction(
  "[Auth] updateProfile Auth",
  props<{ action: DataActionModel<CurrentUserModel> }>()
);

export const updateProfileSuccess = createAction(
  "[Auth] updateProfileSuccess Auth",
  props<{ updateProfileFB: CurrentUserModel }>()
);

export const updateProfileFB = createAction(
  "[Auth] updateProfileFB Auth",
  props<{ action: DataActionModel<CurrentUserModel> }>()
);

export const updateProfileFBSuccess = createAction(
  "[Auth] updateProfileFBSuccess Auth",
  props<{ updateProfileFB: CurrentUserModel }>()
);

export const verifyEmail = createAction("[Auth] verifyEmail Auth");

export const verifyEmailSuccess = createAction(
  "[Auth] verifyEmailSuccess Auth",
  props<{ message: string }>()
);

export const forgotPassword = createAction(
  "[Auth] forgotPassword Auth",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const forgotPasswordSuccess = createAction(
  "[Auth] forgotPasswordSuccess Auth",
  props<{ message: string }>()
);

export const setCurrentUser = createAction(
  "[Auth] setCurrentUser Auth",
  props<{ currentUser: CurrentUserModel }>()
);

export const reset = createAction("[Auth] reset Auth");

export const resetLoading = createAction("[Auth] resetLoading Auth");
