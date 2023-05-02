import { Action, createReducer, on } from '@ngrx/store';
import { setLoadingSpinner } from './shared.action';
import {intialState, SharedState} from './shared.state'

const _sharedReducer = createReducer(intialState, on(setLoadingSpinner, (state, action) => {
    return {
        state,
        showLoading: action.status,
    }
}))
export function SharedReducer(state: SharedState | undefined, action: Action) {
    return _sharedReducer(state, action)
}