import React, { useState, useEffect, useContext } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductsAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

import { UserContext } from "../../Context/UserContext";
import {
  useGetStorageItem,
  useRemoveStorageItem,
} from "../../Services/Storage/StorageServices";
type RootStackParamList = {
  Home: undefined;
  Details: { itemID: number; info: string };
};
type iProps = StackScreenProps<RootStackParamList, "Home">;
interface IParamIsFavorite {
  productID: string;
}

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 100,
  longitudeDelta: 100,
};

const HomeController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dispatch: userDispatch } = useContext(UserContext);
  const getProductsGetAPI = useAPI(ProductsAPI.getAllProducts);
  const getProductPaginate = useAPI(ProductsAPI.getAllProductsPaginate);
  const getFavoriteAPI = useAPI(ProductsAPI.getManageFavorite);
  const [position, setPosition] = useState<LocationObject | null>(null);
  const [statusPosition, setStatusPosition] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState<Region>();
  const [isListEnd, setIsListEnd] = useState(false);
  const checkAuth = async () => {
    let token = await useGetStorageItem("user-token");
    if (!token) {
      navigation.navigate("Signin");
    }
  };

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
      setRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 3,
        longitudeDelta: 3,
      });
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
    checkAuth();
    getDataPaginate();
  }, []);

  const getDataPaginate = async () => {
    console.log("PAGE:" + page);
    if (!isListEnd) {
      getProductPaginate
        .requestPromise(page)
        .then((info: any) => {
          console.log(info.products);
          if (info.products.length > 0) {
            setPage(page + 1);
            setDataConnection([...dataConnection, ...info.products]);
            userDispatch({
              type: "setFav",
              payload: {
                fav: info.products,
              },
            });
            startGetGeoLocation(0);
            setIsLoading(false);
          }
        })
        .catch(async (error: string) => {
          console.log(error);
        });
    } else {
      setIsListEnd(true);
      setIsLoading(false);
    }
  };

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
        await useRemoveStorageItem("user-token");
        navigation.navigate("Signin");
      });
  };

  const goToDetail = (item: IProduct) => {
    navigation.push("Details", {
      itemID: item._id,
      info: JSON.stringify(item),
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
      getDataPage={getDataPage}
      getDataPaginate={getDataPaginate}
      region={region}
      initialRegion={initialRegion}
    />
  );
};

export default HomeController;
