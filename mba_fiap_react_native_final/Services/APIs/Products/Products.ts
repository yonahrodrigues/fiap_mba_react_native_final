import api from "../Common/api";
import { useGetStorageItem } from "../../Storage/StorageServices";
import { Alert } from "react-native";

async function getAllProducts() {
  let token = await useGetStorageItem("user-token");
  console.log("UserINFOToken---->" + token);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return api.get("/storeProducts", config);
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
  //console.log("***********");
  //console.log(url);
  //console.log(data);
  //console.log("***********");
  let token = await useGetStorageItem("user-token");
  if (token && data) {
    // console.log("UserTokenFavorite---->" + token);
    console.log("UserTokenFavoriteDATA---->" + data);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    try {
      //await
    //console.log("Pre API");
      api.post(url + "storeProducts/manageFavorite", data, config);
     // console.log("POS API");
      return data;
    } catch (err: any) {
      console.log("ERROAPI" + err.message || "Unexpected Error!");
    }
  }
};

export default { getManageFavorite, getAllProducts, getFavoriteProducts };
