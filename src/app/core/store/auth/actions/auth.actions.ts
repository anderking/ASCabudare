import { DataActionModel } from "@models/common/data-action.model";
import {
  LoginFormModel,
  LoginResponseModel
} from "@models/auth/login.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Login] Login",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const loginSucess = createAction(
  "[Login] Login Success",
  props<{ login: LoginResponseModel }>()
);

export const register = createAction(
  "[Login] Register",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const registerSucess = createAction(
  "[Login] Register Success",
  props<{ register: LoginResponseModel }>()
);

export const setUserDoc = createAction(
  "[Login] Set UserDoc",
  props<{ action: DataActionModel<LoginResponseModel> }>()
);

export const setUserDocSuccess = createAction(
  "[Login] Set UserDocSuccess",
  props<{ userDoc: LoginResponseModel }>()
);

export const updateProfile = createAction(
  "[Login] Update Profile",
  props<{ action: DataActionModel<LoginResponseModel> }>()
);

export const updateProfileSuccess = createAction(
  "[Login] Update ProfileSuccess",
  props<{ updateProfileFB: LoginResponseModel }>()
);

export const updateProfileFB = createAction(
  "[Login] Update ProfileFB",
  props<{ action: DataActionModel<LoginResponseModel> }>()
);

export const updateProfileFBSuccess = createAction(
  "[Login] Update ProfileFBSuccess",
  props<{ updateProfileFB: LoginResponseModel }>()
);

export const setCurrentUser = createAction(
  "[Login] Set CurrentUser",
  props<{ currentUser: LoginResponseModel }>()
);

export const clear = createAction("[Login] Clear Login");

export const resetLoading = createAction("[Login] Reset Loading Success");
