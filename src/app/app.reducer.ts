import { authReducer } from './auth/store/reducers';
import { uiReducer } from './shared/store/reducers';

export const reducers = {
  ui: uiReducer,
  auth: authReducer,
};
