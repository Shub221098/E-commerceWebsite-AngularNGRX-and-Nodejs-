import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

const selectState =
  createFeatureSelector<AuthState>('auth');

export const getRole = createSelector(selectState, state => state.user?.role)
export const getAuthenticate = createSelector(selectState, state => state.isAuthenticated)
export const getId = createSelector(selectState, state => state.user?.id)
export const getEmail = createSelector(selectState, state => state.user?.email)
export const getName = createSelector(selectState, state => state.user?.name)
export const getMessage = createSelector(selectState, state => state.message)