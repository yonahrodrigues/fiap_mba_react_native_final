import api from "../Common/api";
import { useGetStorageItem } from "../../Storage/StorageServices";

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

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return api.get("/storeProducts/getFavProducts", config);
}

export default { getAllProducts, getFavoriteProducts };
