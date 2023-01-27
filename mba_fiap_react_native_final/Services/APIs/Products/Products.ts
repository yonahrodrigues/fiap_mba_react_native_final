import api from "../Common/api";
import { useGetStorageItem } from "../../Storage/StorageServices";
import { Alert } from "react-native";

async function getAllProducts() {
  let token = await useGetStorageItem("user-token");
  // console.log("UserINFOToken---->" + token);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return api.get(
    "/storeProducts/?page=0&perPage=50&orderDirection=asc",
    config
  );
}

async function getFavoriteProducts() {
  let token = await useGetStorageItem("user-token");
  console.log("UserToken---->" + token);

  if (!token) {
    Alert.alert("Por favor, Efetue o Login primeiro. :)");
  }

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return api.get("/storeProducts/getFavProducts", config);
}

type IParamGetManageFavorite = {
  productID: string;
};
const getManageFavorite = async (url: string, data: string) => {
  let token = await useGetStorageItem("user-token");
  if (token && data) {
    // console.log("UserTokenFavoriteDATA---->" + data);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    try {
      api.post(url + "storeProducts/manageFavorite", data, config);
      return data;
    } catch (err: any) {
      console.log("ERROAPI" + err.message || "Unexpected Error!");
    }
  }
};

export default { getManageFavorite, getAllProducts, getFavoriteProducts };
