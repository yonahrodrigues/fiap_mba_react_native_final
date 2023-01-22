import React, { useState, useEffect, useContext } from "react";
import FavoriteView from "./FavoriteView";
import { StackScreenProps } from "@react-navigation/stack";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductsAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
type iProps = StackScreenProps<RootStackParamList, "Home">;
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { UserContext } from "../../Context/UserContext";

const FavoriteController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dispatch: userDispatch } = useContext(UserContext);
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
        userDispatch({
          type: "setFav",
          payload: {
            fav: info.products,
          },
        });
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

    // console.log("info==>:::" + JSON.stringify(info));
    getFavoriteAPI
      .requestPromise("", JSON.stringify(info))
      .then((res: any) => {
        //console.log("infoP==>:::!!!!!" + JSON.stringify(info));
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
    <FavoriteView
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

export default FavoriteController;
