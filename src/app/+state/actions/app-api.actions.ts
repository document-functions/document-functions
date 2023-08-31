import { createAction, props } from '@ngrx/store';

export const getUsersSuccess = createAction(
  '[Name PAGE] Get users Success',
  props<{ users: any }>()
);

export const getUsersFailure = createAction(
  '[Name PAGE] Get users',
  props<{ error: unknown }>()
);
