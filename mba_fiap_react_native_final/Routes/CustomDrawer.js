import React, { useState, useContext } from "react";
import { View, Text, Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { useRemoveStorageItem } from "../Services/Storage/StorageServices";
import { UserContext } from "../Context/UserContext";

function CustomDrawer({ ...props }) {
  //!todo verificar recuperacao de nome contexto
  const { state: userState } = useContext(UserContext);
  console.log("MaindraweUserInfo ++= " + JSON.stringify(userState.user?.name));

  const removeToken = async () => {
    await useRemoveStorageItem("user-token");
  };

  const makeLogout = () => {
    removeToken();
    props.navigation.navigate("Signin");
  };
  return (
    <DrawerContentScrollView {...props}>
      <Text> Bem Vindo, {userState.user?.name}</Text>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => makeLogout()} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
