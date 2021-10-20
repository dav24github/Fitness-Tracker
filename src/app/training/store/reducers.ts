import { createReducer, on } from '@ngrx/store';
import {
  setAvailableTrainingsAction,
  setFinishedTrainingsAction,
  startTrainingAction,
  stopTrainingsAction,
} from './actions';
import { TrainingStateInterface } from './trainingState.interface';

const initialState: TrainingStateInterface = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export const reducers = createReducer(
  initialState,
  on(
    setAvailableTrainingsAction,
    (state, action): TrainingStateInterface => ({
      ...state,
      availableExercises: action.availableExercises,
    })
  ),
  on(
    setFinishedTrainingsAction,
    (state, action): TrainingStateInterface => ({
      ...state,
      finishedExercises: action.finishedAExercises,
    })
  ),
  on(
    startTrainingAction,
    (state, actions): TrainingStateInterface => ({
      ...state,
      activeTraining: {
        ...state.availableExercises.find(
          (ex) => ex.id === actions.activetrainingId
        )!,
      },
    })
  ),
  on(
    stopTrainingsAction,
    (state): TrainingStateInterface => ({
      ...state,
      activeTraining: null,
    })
  )
);
