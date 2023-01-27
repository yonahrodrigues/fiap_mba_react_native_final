import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import DetailView from "./DetailView";
import IProduct from "../../Interfaces/IProduct";
import IPosition from "../../Interfaces/IPosition";
type RootStackParamList = {
  Details: { itemID: number; info: string };
};
type iProps = StackScreenProps<RootStackParamList, "Details">;

const DetailController = ({ navigation, route }: iProps) => {
  let objectItem = null;
  let objectPosition = null;
  if (route && route.params) {
    const { info } = route.params;
    objectItem = JSON.parse(info) as IProduct;
  }

  const { state: userState } = useContext(UserContext);

  objectPosition = userState?.currentPosition as IPosition;

  return <DetailView objectItem={objectItem} objectPosition={objectPosition} />;
};

export default DetailController;
