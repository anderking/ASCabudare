import { DataActionModel } from "@models/common/data-action.model";
import {
  LoginFormModel,
  CurrentUserModel
} from "@models/auth/current-user.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Login] Login",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const loginSucess = createAction(
  "[Login] Login Success",
  props<{ login: CurrentUserModel }>()
);

export const register = createAction(
  "[Login] Register",
  props<{ action: DataActionModel<LoginFormModel> }>()
);

export const registerSucess = createAction(
  "[Login] Register Success",
  props<{ register: CurrentUserModel }>()
);

export const setUserDoc = createAction(
  "[Login] Set UserDoc",
  props<{ action: DataActionModel<CurrentUserModel> }>()
);

export const setUserDocSuccess = createAction(
  "[Login] Set UserDocSuccess",
  props<{ userDoc: CurrentUserModel }>()
);

export const updateProfile = createAction(
  "[Login] Update Profile",
  props<{ action: DataActionModel<CurrentUserModel> }>()
);

export const updateProfileSuccess = createAction(
  "[Login] Update ProfileSuccess",
  props<{ updateProfileFB: CurrentUserModel }>()
);

export const updateProfileFB = createAction(
  "[Login] Update ProfileFB",
  props<{ action: DataActionModel<CurrentUserModel> }>()
);

export const updateProfileFBSuccess = createAction(
  "[Login] Update ProfileFBSuccess",
  props<{ updateProfileFB: CurrentUserModel }>()
);

export const setCurrentUser = createAction(
  "[Login] Set CurrentUser",
  props<{ currentUser: CurrentUserModel }>()
);

export const clear = createAction("[Login] Clear Login");

export const resetLoading = createAction("[Login] Reset Loading Success");
