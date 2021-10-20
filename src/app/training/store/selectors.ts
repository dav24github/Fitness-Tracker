import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/appState.interface';
import { TrainingStateInterface } from './trainingState.interface';

export const trainingFeatureSelector = createFeatureSelector<
  AppStateInterface,
  TrainingStateInterface
>('training');

export const availableExercisesSelector = createSelector(
  trainingFeatureSelector,
  (trainingState: TrainingStateInterface) => trainingState.availableExercises
);
export const finishedExercisesSelector = createSelector(
  trainingFeatureSelector,
  (trainingState: TrainingStateInterface) => trainingState.finishedExercises
);
export const activeTrainingSelector = createSelector(
  trainingFeatureSelector,
  (trainingState: TrainingStateInterface) => trainingState.activeTraining
);
export const isTrainingSelector = createSelector(
  trainingFeatureSelector,
  (trainingState: TrainingStateInterface) =>
    trainingState.activeTraining != null
);
