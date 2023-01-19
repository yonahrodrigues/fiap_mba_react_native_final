import React, { useContext } from "react";
//import { useAppDispatch } from "../../Store/hooks";
//import { setUser } from "../../Store/Login/LoginSlice";
import { UserContext } from "../../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useRemoveStorageItem } from "../../Services/Storage/StorageServices";

const LogoutController = (props) => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const removeToken = async () => {
    await useRemoveStorageItem("user-token");
  };

  const makeLogout = () => {
    removeToken();
    navigation.navigate("Signin");
  };
  makeLogout();
  return <View></View>;
};

export default LogoutController;
