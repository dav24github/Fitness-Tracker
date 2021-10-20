import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/appState.interface';
import { AuthStateInterface } from '../authState.interface';

export const uiFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth');

export const isAuthenticatedSelector = createSelector(
  uiFeatureSelector,
  (authState: AuthStateInterface) => authState.isAuthenticated
);
