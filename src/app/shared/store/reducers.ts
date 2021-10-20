import { createReducer, on } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from './actions';
import { UiStateInterface } from '../UiState.interface';

const initialState: UiStateInterface = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(
    startLoadingAction,
    (state): UiStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    stopLoadingAction,
    (state): UiStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);
