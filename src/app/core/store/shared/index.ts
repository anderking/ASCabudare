import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { sharedReducer } from "@store/shared/reducers";


export const sharedFeatureKey = "shared";

export interface SharedState {
  shared: sharedReducer.State;
}

export const reducers: ActionReducerMap<SharedState> = {
  shared: sharedReducer.reducer,
};

export const getSharedState = createFeatureSelector<SharedState>(sharedFeatureKey);

export const getShared = createSelector(
  getSharedState,
  (state: SharedState) => state.shared
);
