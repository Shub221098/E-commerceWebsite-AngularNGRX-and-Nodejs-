import { User } from 'src/app/auth/user.model';
import * as UserActions from './user.action';
export interface UserState {
  user: User[];
}

const initialState: UserState = {
  user: [],
};

export function userReducer(
  state: UserState | any = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.SAVE_USERS:
      if (action.payload === null) {
        return {
          ...state,
          user: null,
        };
      } else {
        return {
          ...state,
          user: [...action.payload],
        };
      }
    case UserActions.UPDATE_USER_IN_STORE: 
    let updatedUser = state.user.map((user: any) => {
        return user._id === action.payload.id
          ? action.payload
          : user;
      });
      return {
        ...state,
        user: [...updatedUser],
      };

    default:
      return state;
  }
}
