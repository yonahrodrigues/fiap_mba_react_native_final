import React, { useContext } from "react";
//import { useAppDispatch } from "../../Store/hooks";
//import { setUser } from "../../Store/Login/LoginSlice";
import { UserContext } from "../../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const LogoutController = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const makeLogout = () => {
    userDispatch({
      type: "cleanUser",
      payload: {},
    });

    navigation.navigate("Signin");
  };
  makeLogout();
  return <View></View>;
};

export default LogoutController;
