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
  products: [] | null;
  favorites: [] | null;
}

export const initialState: UserState = {
  // Define the initial state using that type
  user: null,
  products: [],
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
      return { ...state, products: action.payload.fav };

    case "upFav":
      // console.log("upFav+ " + JSON.stringify(action.payload));
      // console.log("busca State atual");

      const listaAtual = state.products;
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
      //const newFavorites = { ...state, favorites: state.listaItens, listAtual };
      // console.log("Update Favorites" + JSON.stringify(newFavorites));

      return { ...state, products: state.products, listAtual };

    case "favorite":
      console.log("upFFFav+ " + JSON.stringify(action.payload));
      // console.log("busca State atual");

      const listaAtualFav = state.favorites;
      console.log("busca Lista atual" + JSON.stringify(state));
      let listAtualFav = listaAtualFav.map(function (item) {
        if (item._id == action.payload.fav.productID) {
          item.favorite = !item.favorite;
          return item;
        } else {
          return item;
        }
      });
      // console.log("busca State atual::" + JSON.stringify(listAtual));
      //const newFavorites = { ...state, favorites: state.favorites, listAtualFav };
      // console.log("Update Favorites" + JSON.stringify(newFavorites));

      return { ...state, favorites: state.favorites, listAtualFav };

    default:
      return state;
  }
};
