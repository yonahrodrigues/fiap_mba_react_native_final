import api from "../Common/api";
import { useGetStorageItem } from "../../Storage/StorageServices";
import { Alert } from "react-native";

async function getAllProducts() {
  let token = await useGetStorageItem("user-token");
  console.log("UserINFOToken---->" + token);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
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
    },
  };
  return api.get("/storeProducts/getFavProducts", config);
}

export default { getAllProducts, getFavoriteProducts };
