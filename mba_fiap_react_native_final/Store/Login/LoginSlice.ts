import { createSlice } from "@reduxjs/toolkit";
import IUserInfo from "../../Interfaces/iUserInfo";
import {
  useSetStorageItem,
  useRemoveStorageItem,
} from "../../Services/Storage/StorageServices";

import type { RootState } from "../store";
import { ISetUserPayload, UserState } from "./LoginSliceTypes";

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: async (state, action: ISetUserPayload) => {
      let user: IUserInfo | null = action.payload?.user ?? null;
      state.user = user;
      await useSetStorageItem("user-token", user?.token);
    },
    cleanUser: async (state) => {
      state.user = null;
      await useRemoveStorageItem("user-token");
    },
  },
});

// this is for dispatch
export const { setUser, cleanUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const loggedUser = (state: RootState) => state.login.user;

// this is for configureStore
export default userSlice.reducer;