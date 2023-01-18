import IUserInfo from "../Interfaces/iUserInfo";
import {
  useRemoveStorageItem,
  useSetStorageItem,
} from "../Services/Storage/StorageServices";
import { useNavigation } from "@react-navigation/native";
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
  const removeToken = async () => {
    await useRemoveStorageItem("user-token");
  };

  const addToken = async (token: string) => {
    await useSetStorageItem("user-token", token);
  };
  switch (action.type) {
    case "setUser":
      console.log("SETUSER+ " + JSON.stringify(action.payload));
      let user: IUserInfo | null = action.payload?.user ?? null;
      if (user?.token != undefined) {
        addToken(user?.token);
      }
      return { ...state, user: action.payload.user };
    case "cleanUser":
      removeToken();
      const navigation = useNavigation();
      console.log("saindo");
      navigation.reset({
        routes: [{ name: "Signin" }],
      });
      return { ...state, user: null };
    default:
      return state;
  }
};
