import { createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../authState.interface';
import { setAuthenticatedAction, setUnautheticatedActions } from './actions';

const initialState: AuthStateInterface = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    setAuthenticatedAction,
    (state): AuthStateInterface => ({
      ...state,
      isAuthenticated: true,
    })
  ),
  on(
    setUnautheticatedActions,
    (state): AuthStateInterface => ({
      ...state,
      isAuthenticated: false,
    })
  )
);
