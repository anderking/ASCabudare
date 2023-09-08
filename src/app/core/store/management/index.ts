import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { ingresoEgresoReducer, lendingReducer } from "@store/management/reducers";

export const managementFeatureKey = "management";

export interface ManagementState {
  ingresoEgreso: ingresoEgresoReducer.State;
  lending: lendingReducer.State;
}

export const reducers: ActionReducerMap<ManagementState> = {
  ingresoEgreso: ingresoEgresoReducer.reducer,
  lending: lendingReducer.reducer,
};

export const getManagementState = createFeatureSelector<ManagementState>(
  managementFeatureKey
);

export const getIngresoEgreso = createSelector(
  getManagementState,
  (state: ManagementState) => state.ingresoEgreso
);

export const getLending = createSelector(
  getManagementState,
  (state: ManagementState) => state.lending
);
