import { User } from '../user.model';
import * as AuthActions from './auth.actions';
export interface AuthState {
  user: User | null;
  authError: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
const intialState: AuthState = {
  user: null,
  authError: null,
  isAuthenticated: false,
  loading: false,
};
export function authReducer(
  state = intialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.userId,
        action.payload.email,
        action.payload.name,
        action.payload.role,
        action.payload.active,
        action.payload.token
      );
      return {
        ...state,
        user: user,
        authError: null,
        isAuthenticated: true,
        loading: false,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        // authError: action.payload,
        loading: false,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
