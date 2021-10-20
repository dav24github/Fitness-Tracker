import { AuthStateInterface } from './auth/authState.interface';
import { UiStateInterface } from './shared/UiState.interface';
import { TrainingStateInterface } from './training/store/trainingState.interface';

export interface AppStateInterface {
  ui: UiStateInterface;
  auth: AuthStateInterface;
  training: TrainingStateInterface;
}
