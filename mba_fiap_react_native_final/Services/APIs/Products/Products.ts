import api from "../Common/api";
import { useGetStorageItem } from "../../Storage/StorageServices";

async function getAllProducts() {
  let token = await useGetStorageItem("user-token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return api.get(`/storeProducts/?perPage=50&orderDirection=asc`, config);
}

async function getAllProductsPaginate(page) {
  console.log("ESTE é o valor de page " + JSON.stringify(page));
  let token = await useGetStorageItem("user-token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  let pag = JSON.stringify(page);
  let url = `/storeProducts/?page=${pag}perPage=10&orderDirection=asc`;
  console.log("URL" + url);
  return api.get(url, config);
}

async function getFavoriteProducts() {
  let token = await useGetStorageItem("user-token");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  return api.get("/storeProducts/getFavProducts", config);
}

const getManageFavorite = async (url: string, data: string) => {
  let token = await useGetStorageItem("user-token");
  if (token && data) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    try {
      await api.post(url + "storeProducts/manageFavorite", data, config);
      return data;
    } catch (err: any) {
      console.log("ERROR API" + err.message || "Unexpected Error!");
    }
  }
};

export default {
  getManageFavorite,
  getAllProducts,
  getAllProductsPaginate,
  getFavoriteProducts,
};
