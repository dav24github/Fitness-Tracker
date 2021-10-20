import { Exercise } from '../exercise.model';

export interface TrainingStateInterface {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}
