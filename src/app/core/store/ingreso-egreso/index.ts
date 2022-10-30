import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { ingresoEgresoReducer } from "@store/ingreso-egreso/reducers";

export const ingresoEgresoFeatureKey = "ingresoEgreso";

export interface IngresoEgresoState {
  ingresoEgreso: ingresoEgresoReducer.State;
}

export const reducers: ActionReducerMap<IngresoEgresoState> = {
  ingresoEgreso: ingresoEgresoReducer.reducer,
};

export const getIngresoEgresoState = createFeatureSelector<IngresoEgresoState>(
  ingresoEgresoFeatureKey
);

export const getIngresoEgreso = createSelector(
  getIngresoEgresoState,
  (state: IngresoEgresoState) => state.ingresoEgreso
);
