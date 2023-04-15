import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

const selectState =
  createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(selectState, state => state.user)