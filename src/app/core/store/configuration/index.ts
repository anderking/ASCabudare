import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";

export const configurationFeatureKey = "configuration";

export interface ConfigurationState {
}

export const reducers: ActionReducerMap<ConfigurationState> = {
};

export const getConfigurationState = createFeatureSelector<ConfigurationState>(
  configurationFeatureKey
);
