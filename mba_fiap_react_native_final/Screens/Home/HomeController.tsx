import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductsAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import { Button } from "react-native-elements";
import { useAppDispatch } from "../../Store/hooks";
import { cleanUser } from "../../Store/Login/LoginSlice";
type iProps = StackScreenProps<RootStackParamList, "Home">;
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
const HomeController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductsGetAPI = useAPI(ProductsAPI.getAllProducts);
  const getFavoriteAPI = useAPI(ProductsAPI.getManageFavorite);

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
      })
      .catch((error: string) => {
        console.log(error);
        console.log("ERRO 500 JWT EXPIRADO::::");
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

    console.log("info==>:::" + JSON.stringify(info));
    setIsLoading(true);
    getFavoriteAPI
      .requestPromise("", JSON.stringify(info))
      .then((info: any) => {
        getDataPage().then((info: any) => {
          setDataConnection(info.products);
        });
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        setIsLoading(false);
      });
  };

  //Criando os states para buscar a informação
  const [position, setPosition] = useState<LocationObject | null>(null);
  const [statusPosition, setStatusPosition] = useState<number>(0);

  const startGetGeoLocation = (type: number) => {
    setTimeout(async () => {
      //Verifica se o usuário já deu a permissão e, caso não tenha, solicita a permissão
      let { status } = await Location.requestForegroundPermissionsAsync();
      //Retorna o erro
      if (status !== "granted") {
        setStatusPosition(-1);
        return;
      }

      //Com o permissão em ordem, busca a posição do usuário assincronamente
      let currentPosition;
      if (type === 0) {
        currentPosition = await Location.getCurrentPositionAsync({});
      } else {
        currentPosition = await Location.getLastKnownPositionAsync({});
      }

      setPosition(currentPosition);
      setStatusPosition(2);

      console.log(currentPosition);
    }, 1000);
  };
  const cleanInfo = () => {
    setStatusPosition(0);
  };

  return (
    <HomeView
      isFavorite={isFavorite}
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
      position={position}
      statusPosition={statusPosition}
      startGetGeoLocation={startGetGeoLocation}
      cleanInfo={cleanInfo}
    />
  );
};

export default HomeController;
