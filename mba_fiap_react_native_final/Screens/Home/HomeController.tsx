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

const HomeController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductsGetAPI = useAPI(ProductsAPI.getAllProducts);
  const getFavoriteAPI = useAPI(ProductsAPI.getManageFavorite);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            dispatch(cleanUser());
            navigation.navigate("MyPosition");
          }}
          title="Logoff"
          type="clear"
          titleStyle={{ color: "white" }}
        />
      ),
    });
  }, [navigation]);

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

    console.log("info==>" + info);

    getFavoriteAPI
      .requestPromise(JSON.stringify(info))
      .then((res: any) => {
        console.log(res.data);
        console.log("Atualizado");
        // dispatch(setUser({ user }));
        // setIsLoadingAuth(false);
        // navigation.navigate("Home");
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        // console.log("ERRO 500 JWT EXPIRADO::::");
        // navigation.navigate("Signin");
      });
  };

  return (
    <HomeView
      isFavorite={isFavorite}
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};

export default HomeController;
