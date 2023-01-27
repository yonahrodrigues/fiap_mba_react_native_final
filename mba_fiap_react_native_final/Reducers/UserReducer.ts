import IUserInfo from "../Interfaces/iUserInfo";
import { useSetStorageItem } from "../Services/Storage/StorageServices";
import IProduct from "../Interfaces/IProduct";
import IPosition from "../Interfaces/IPosition";
interface UserState {
  user: IUserInfo | null;
  products: [] | null;
  favorites: [] | null;
  currentPosition: {} | null;
}

export const initialState: UserState = {
  // Define the initial state using that type
  user: null,
  products: [],
  favorites: [],
  currentPosition: {},
};

export const UserReducer = (state, action) => {
  const addToken = async (token: string) => {
    await useSetStorageItem("user-token", token);
  };
  switch (action.type) {
    case "setUser":
      let user: IUserInfo | null = action.payload?.user ?? null;
      if (user?.token != undefined) {
        addToken(user?.token);
      }
      return { ...state, user: action.payload.user };
    case "cleanUser":
      return { ...state, user: null };

    case "setFav":
      let fav: IProduct | null = action.payload?.fav ?? null;
      return { ...state, products: fav };

    case "setPos":
      let pos: IPosition | null = action.payload?.currentPosition ?? null;
      console.log("POS" + JSON.stringify(pos));
      return { ...state, currentPosition: pos };

    case "upFav":
      const listaAtual = state.products;
      let listAtual = listaAtual.map(function (item) {
        if (item._id == action.payload.fav.productID) {
          item.favorite = !item.favorite;
          return item;
        } else {
          return item;
        }
      });
      return { ...state, products: state.products, listAtual };

    case "favorite":
      const listaAtualFav = state.favorites;
      let listAtualFav = listaAtualFav.map(function (item) {
        if (item._id == action.payload.fav.productID) {
          item.favorite = !item.favorite;
          return item;
        } else {
          return item;
        }
      });
      return { ...state, favorites: state.favorites, listAtualFav };

    default:
      return state;
  }
};
