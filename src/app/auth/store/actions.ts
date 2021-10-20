import { createAction } from '@ngrx/store';
import { ActionTypes } from './actionTypes';

export const setAuthenticatedAction = createAction(
  ActionTypes.SET_AUTHENTICATED
);

export const setUnautheticatedActions = createAction(
  ActionTypes.SET_UNAUTHENTICATED
);
