import "react-native-gesture-handler";
import React, { useState, useContext } from "react";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import LoginController from "../Screens/Login/LoginController";
import RegisterController from "../Screens/Register/RegisterController";
import PreloadController from "../Screens/Preload/PreloadController";

import { MainTab } from "./MainTab";
import DetailController from "../Screens/Detail/DetailController";
import LogoutController from "../Screens/Login/LogoutController";
import HomeController from "../Screens/Home/HomeController";
import { UserContext } from "../Context/UserContext";
import FavoriteController from "../Screens/Favorites/FavoriteController";

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  //!todo verificar recuperacao de nome contexto
  const { state: userState } = useContext(UserContext);
  console.log("MaindraweUserInfo =" + JSON.stringify(userState.user));
  //console.log("MaindraweUserInfo =" + userState.user.name);
  return (
    <>
      {/* <Text>{userState.user?.name !== null ? userState.user.name : ""}</Text> */}

      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Principal" component={HomeController} />
        <Drawer.Screen name="Favoritos" component={FavoriteController} />
        <Drawer.Screen name="Logout" component={LogoutController} />
      </Drawer.Navigator>
    </>
  );
};
