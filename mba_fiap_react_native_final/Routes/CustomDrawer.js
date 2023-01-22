import React, { useState, useContext } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import {
  useRemoveStorageItem,
  useGetStorageItem,
} from "../Services/Storage/StorageServices";
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
      <SafeAreaView>
        <View style={{ justifyContent: "center", height: 200 }}>
          <Text style={{ marginTop: 20, marginLeft: 12 }}>
            {userState.user ? "Bem Vindo, " + userState.user?.name : ""}
          </Text>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => makeLogout()} />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
