import IUserInfo from "../Interfaces/iUserInfo";
import {
  useRemoveStorageItem,
  useSetStorageItem,
} from "../Services/Storage/StorageServices";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
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
      return { ...state, user: null };

    case "setFav":
      console.log("setFav+ " + JSON.stringify(action.payload));
      let fav: IUserInfo | null = action.payload?.fav ?? null;
      return { ...state, favorites: action.payload.fav };

    case "upFav":
      // console.log("upFav+ " + JSON.stringify(action.payload));
      // console.log("busca State atual");

      const listaAtual = state.favorites;
      // console.log("busca Lista atual" + listaAtual);
      let listAtual = listaAtual.map(function (item) {
        if (item._id == action.payload.fav.productID) {
          item.favorite = !item.favorite;
          return item;
        } else {
          return item;
        }
      });
      // console.log("busca State atual::" + JSON.stringify(listAtual));
      const newFavorites = { ...state, favorites: state.favorites, listAtual };
      // console.log("Update Favorites" + JSON.stringify(newFavorites));

      return { ...state, favorites: state.favorites, listAtual };

    default:
      return state;
  }
};
