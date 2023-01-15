import React, { useState, useEffect } from "react";
import FavoriteView from "./FavoriteView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductsAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import { Button } from "react-native-elements";
import { useAppDispatch } from "../../Store/hooks";
import { cleanUser } from "../../Store/Login/LoginSlice";

type iProps = StackScreenProps<RootStackParamList, "Home">;

const FavoriteController = ({ route, navigation }: iProps) => {
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductsGetAPI = useAPI(ProductsAPI.getFavoriteProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => dispatch(cleanUser())}
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
      });
  };

  const goToDetail = (item: IProduct) => {
    navigation.push("Details", {
      itemID: item._id,
      info: JSON.stringify(item),
    });
  };

  return (
    <FavoriteView
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};

export default FavoriteController;
