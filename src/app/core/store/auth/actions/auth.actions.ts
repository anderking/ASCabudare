import { DataActionModel } from "@models/common/data-action.model";
import {
  LoginFormModel,
  LoginResponseModel,
  RegisterFormModel,
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
  props<{ action: DataActionModel<RegisterFormModel> }>()
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
  props<{ userDoc: string }>()
);

export const setCurrentUser = createAction(
  "[Login] Set CurrentUser",
  props<{ currentUser: LoginResponseModel }>()
);

export const clear = createAction("[Login] Clear Login");

export const resetLoading = createAction("[Login] Reset Loading Success");
