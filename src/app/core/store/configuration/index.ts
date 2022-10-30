import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { categoryReducer } from "@store/configuration/reducers";

export const configurationFeatureKey = "configuration";

export interface ConfigurationState {
  category: categoryReducer.State;
}

export const reducers: ActionReducerMap<ConfigurationState> = {
  category: categoryReducer.reducer,
};

export const getConfigurationState = createFeatureSelector<ConfigurationState>(
  configurationFeatureKey
);

export const getCategory = createSelector(
  getConfigurationState,
  (state: ConfigurationState) => state.category
);
