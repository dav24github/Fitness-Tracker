import { createAction, props } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { actionTypes } from './actionTypes';

export const setAvailableTrainingsAction = createAction(
  actionTypes.SET_AVAILABLE_TRAININGS,
  props<{ availableExercises: Exercise[] }>()
);

export const setFinishedTrainingsAction = createAction(
  actionTypes.SET_FINISHED_TRAININGS,
  props<{ finishedAExercises: Exercise[] }>()
);

export const startTrainingAction = createAction(
  actionTypes.START_TRAINING,
  props<{ activetrainingId: string }>()
);

export const stopTrainingsAction = createAction(actionTypes.STOP_TRAINING);
