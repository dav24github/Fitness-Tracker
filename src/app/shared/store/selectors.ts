import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/appState.interface';
import { UiStateInterface } from '../UiState.interface';

export const uiFeatureSelector = createFeatureSelector<
  AppStateInterface,
  UiStateInterface
>('ui');

export const isLoadingSelector = createSelector(
  uiFeatureSelector,
  (uiState: UiStateInterface) => uiState.isLoading
);
