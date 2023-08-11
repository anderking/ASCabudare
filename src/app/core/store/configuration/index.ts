import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { categoryReducer, clientReducer } from "@store/configuration/reducers";

export const configurationFeatureKey = "configuration";

export interface ConfigurationState {
  category: categoryReducer.State;
  client: clientReducer.State;
}

export const reducers: ActionReducerMap<ConfigurationState> = {
  category: categoryReducer.reducer,
  client: clientReducer.reducer,
};

export const getConfigurationState = createFeatureSelector<ConfigurationState>(
  configurationFeatureKey
);

export const getCategory = createSelector(
  getConfigurationState,
  (state: ConfigurationState) => state.category
);

export const getClient = createSelector(
  getConfigurationState,
  (state: ConfigurationState) => state.client
);
