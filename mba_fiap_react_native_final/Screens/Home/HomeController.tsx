import React, { useState, useEffect, useContext } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductsAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
type RootStackParamList = {
  Home: undefined;
  Details: { itemID: number; info: string };
};
type iProps = StackScreenProps<RootStackParamList, "Home">;

import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { UserContext } from "../../Context/UserContext";
import IPosition from "../../Interfaces/IPosition";
import { useGetStorageItem, useRemoveStorageItem } from "../../Services/Storage/StorageServices";

interface IParamIsFavorite {
  productID: string;
}

const HomeController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dispatch: userDispatch } = useContext(UserContext);
  const getProductsGetAPI = useAPI(ProductsAPI.getAllProducts);
  const getFavoriteAPI = useAPI(ProductsAPI.getManageFavorite);
  const [position, setPosition] = useState<LocationObject | null>(null);
  const [statusPosition, setStatusPosition] = useState<number>(0);

  const checkAuth = async () => {
    let token = await useGetStorageItem("user-token");
    console.log("VerificaToken===>  " + token);
    if (!token) {
      navigation.navigate("Signin");
    }
  };

  useEffect(() => {
    checkAuth();
    //   startGetGeoLocation(0);
  }, []);

  const startGetGeoLocation = async (type: number) => {
    setTimeout(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setStatusPosition(-1);
        return;
      }

      let currentPosition;
      if (type === 0) {
        currentPosition = await Location.getCurrentPositionAsync({});
      } else {
        currentPosition = await Location.getLastKnownPositionAsync({});
      }

      setPosition(currentPosition);
      userDispatch({
        type: "setPos",
        payload: {
          currentPosition,
        },
      });
      setStatusPosition(2);

      console.log(currentPosition);
    }, 10000);
  };

  const cleanInfo = () => {
    setStatusPosition(0);
  };

  useEffect(() => {
    getDataPage();
  }, []);

  const getDataPage = async () => {
    setIsLoading(true);
    getProductsGetAPI
      .requestPromise()
      .then((info: any) => {
        setIsLoading(false);
        setDataConnection(info.products);
        userDispatch({
          type: "setFav",
          payload: {
            fav: info.products,
          },
        });
        startGetGeoLocation(0);
      })
      .catch(async (error: string) => {
        console.log(error);
        console.log("ERRO 500 JWT EXPIRADO::::");
        const tokenExpired = await useRemoveStorageItem("user-token");
        console.log("ERRO 500 JWT EXPIRADO::::+" + tokenExpired);
        navigation.navigate("Signin");
      });
  };

  const goToDetail = (item: IProduct, position: IPosition) => {
    navigation.push("Details", {
      itemID: item._id,
      info: JSON.stringify(item),
      position: JSON.stringify(position),
    });
  };

  const isFavorite = (productID: string) => {
    let info: IParamIsFavorite = {
      productID,
    };
    getFavoriteAPI
      .requestPromise("", JSON.stringify(info))
      .then((res: any) => {
        userDispatch({
          type: "upFav",
          payload: {
            fav: info,
          },
        });
      })
      .catch((error: any) => {
        console.log("Retornou erro!!!");
        console.log(error);
      });
  };

  return (
    <HomeView
      isFavorite={isFavorite}
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
      position={position}
      statusPosition={statusPosition}
      cleanInfo={cleanInfo}
    />
  );
};

export default HomeController;
