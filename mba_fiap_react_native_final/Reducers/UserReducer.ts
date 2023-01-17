import IUserInfo from "../Interfaces/iUserInfo";

interface UserState {
  user: IUserInfo | null;
  favorites: [] | null;
}

export const initialState: UserState = {
  // Define the initial state using that type
  user: null,
  favorites: [],
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
