import React from "react";
import DetailView from "./DetailView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import IProduct from "../../Interfaces/IProduct";

type iProps = StackScreenProps<RootStackParamList, "Details">;

const DetailController = ({ navigation, route }: iProps) => {
    let objectItem = null;
    if (route && route.params) {
      const { info } = route.params;
      objectItem = JSON.parse(info) as IProduct;
    }

    return <DetailView objectItem={objectItem} />;
};

export default DetailController;