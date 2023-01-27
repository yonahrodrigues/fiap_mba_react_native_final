import React, { useEffect } from "react";
import PreloadView from "./PreloadView";
import { useGetStorageItem } from "../../Services/Storage/StorageServices";
import { useNavigation } from "@react-navigation/native";

const PreloadController = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      let token = await useGetStorageItem("user-token");
      if (token) {
        navigation.navigate("MainDrawer");
      } else {
        navigation.navigate("Signin");
      }
    };
    checkToken();
  });

  return <PreloadView />;
};

export default PreloadController;
