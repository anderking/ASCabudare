import { DataActionModel } from "@models/common/data-action.model";
import { LoginModel } from "@models/auth/login.model";
import { createAction, props } from "@ngrx/store";
import { UserModel } from "@models/auth/user.model";

export const login = createAction(
  "[Login] Login",
  props<{ action: DataActionModel<LoginModel> }>()
);

export const loginSucess = createAction(
  "[Login] Login Success",
  props<{ login: LoginModel }>()
);

export const register = createAction(
  "[Login] Register",
  props<{ action: DataActionModel<LoginModel> }>()
);

export const registerSucess = createAction(
  "[Login] Register Success",
  props<{ register: LoginModel }>()
);

export const setuser = createAction(
  "[Login] Set User",
  props<{ user: UserModel }>()
);

export const clear = createAction("[Login] Clear Login");

export const resetLoading = createAction("[Login] Reset Loading Success");
