import { createAction } from '@ngrx/store';
import { ActionTypes } from './actionTypes';

export const startLoadingAction = createAction(ActionTypes.START_LOADING);

export const stopLoadingAction = createAction(ActionTypes.STOP_LOADING);
