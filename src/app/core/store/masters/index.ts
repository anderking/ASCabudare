import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { comboReducer } from "@store/masters/reducers";

export const mastersFeatureKey = "masters";

export interface MastersState {
  combo: comboReducer.State;
}

export const reducers: ActionReducerMap<MastersState> = {
  combo: comboReducer.reducer,
};

export const getMastersState = createFeatureSelector<MastersState>(
  mastersFeatureKey
);

export const getMasters = createSelector(
  getMastersState,
  (state: MastersState) => state.combo
);
