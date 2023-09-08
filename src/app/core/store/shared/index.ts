import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { notificationReducer, attachmentReducer } from "@store/shared/reducers";

export const sharedFeatureKey = "shared";

export interface SharedState {
  notification: notificationReducer.State;
  attachment: attachmentReducer.State;
}

export const reducers: ActionReducerMap<SharedState> = {
  notification: notificationReducer.reducer,
  attachment: attachmentReducer.reducer,
};

export const getSharedState =
  createFeatureSelector<SharedState>(sharedFeatureKey);

export const getNotification = createSelector(
  getSharedState,
  (state: SharedState) => state.notification
);

export const getAttachment = createSelector(
  getSharedState,
  (state: SharedState) => state.attachment
);
