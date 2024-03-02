import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { payReducer } from "@store/management/reducers";

export const managementFeatureKey = "management";

export interface ManagementState {
  pay: payReducer.State;
}

export const reducers: ActionReducerMap<ManagementState> = {
  pay: payReducer.reducer,
};

export const getManagementState = createFeatureSelector<ManagementState>(
  managementFeatureKey
);

export const getPay = createSelector(
  getManagementState,
  (state: ManagementState) => state.pay
);
